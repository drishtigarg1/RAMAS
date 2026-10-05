import mongoose from "mongoose";
import Order from "../models/Order.js";

import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0 || orderItems.length > 50) {
      return res.status(400).json({ message: "No order items" });
    }

    if (paymentMethod !== "COD") {
      return res.status(400).json({ message: "Only Cash on Delivery is currently available." });
    }

    const requiredAddressFields = ["fullName", "address", "city", "postalCode", "country", "phone"];
    if (!shippingAddress || requiredAddressFields.some((field) => !String(shippingAddress[field] || "").trim())) {
      return res.status(400).json({ message: "Complete shipping address details are required." });
    }

    const productIds = orderItems.map((item) => item.product);
    const hasDuplicateProducts = new Set(productIds).size !== productIds.length;
    if (hasDuplicateProducts) {
      return res.status(400).json({ message: "Each product may appear only once in an order." });
    }

    // 1. Validate all ObjectIds to prevent CastError from stale frontend data
    const invalidItems = orderItems.filter(item => !mongoose.Types.ObjectId.isValid(item.product));
    if (invalidItems.length > 0) {
      return res.status(400).json({ message: "Invalid product ID(s) detected in cart. Please clear your cart and try again." });
    }

    if (orderItems.some((item) => !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 100)) {
      return res.status(400).json({ message: "Each quantity must be a whole number between 1 and 100." });
    }

    await session.startTransaction();

    // 2. Get prices from DB
    const itemsFromDB = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    if (itemsFromDB.length !== orderItems.length) {
      return res.status(404).json({ message: "One or more products not found" });
    }

    // 2. Map and calculate
    let calculatedItemsPrice = 0;
    const finalOrderItems = orderItems.map((clientItem) => {
      const dbProduct = itemsFromDB.find((x) => x._id.toString() === clientItem.product);
      
      // Check for discountPrice else fallback to price
      const priceToUse = dbProduct.discountPrice ?? dbProduct.price;

      calculatedItemsPrice += priceToUse * clientItem.qty;

      return {
        name: dbProduct.name,
        qty: clientItem.qty,
        image: dbProduct.images && dbProduct.images.length > 0 ? dbProduct.images[0].url : clientItem.image,
        price: priceToUse,
        product: dbProduct._id,
      };
    });

    const calculatedShippingPrice = calculatedItemsPrice >= 499 ? 0 : 50;
    const calculatedTaxPrice = Math.round(calculatedItemsPrice * 0.18);
    const calculatedTotalPrice = calculatedItemsPrice + calculatedShippingPrice + calculatedTaxPrice;

    const order = new Order({
      orderItems: finalOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice: calculatedItemsPrice,
      taxPrice: calculatedTaxPrice,
      shippingPrice: calculatedShippingPrice,
      totalPrice: calculatedTotalPrice,
      invoiceNumber: `RAMA-INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${String(Date.now()).slice(-6)}`,
    });

    const createdOrder = await order.save({ session });

    // 3. Reduce stock atomically so concurrent checkouts cannot oversell.
    for (const item of finalOrderItems) {
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: item.product, countInStock: { $gte: item.qty } },
        { $inc: { countInStock: -item.qty } },
        { new: true, session }
      );

      if (!updatedProduct) throw new Error(`${item.name} is out of stock`);
    }

    await session.commitTransaction();

    res.status(201).json(createdOrder);
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    res.status(500).json({ message: error.message || "Server Error" });
  } finally {
    await session.endSession();
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
      // Allow only the admin or the user who placed the order
      if (req.user.role === 'admin' || order.user._id.toString() === req.user._id.toString()) {
        res.json(order);
      } else {
         res.status(403).json({ message: "Not authorized to view this order" });
      }
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  return res.status(501).json({ message: "Online payments are not enabled yet." });
};

// @desc    Update order status / deliver
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const allowedStatuses = ["Pending", "Confirmed", "Processing", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled", "Returned", "Refunded"];

    if (order) {
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid order status." });
      }

      if (["Delivered", "Cancelled", "Returned", "Refunded"].includes(order.status)) {
        return res.status(400).json({ message: "This order can no longer change status." });
      }

      order.status = req.body.status;
      order.statusHistory.push({ status: order.status, message: req.body.message || `Order status updated to ${order.status}` });
      
      if (req.body.status === "Delivered") {
         order.isDelivered = true;
         order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
