import mongoose from "mongoose";
import Order from "../models/Order.js";

import Product from "../models/Product.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // 1. Validate all ObjectIds to prevent CastError from stale frontend data
    const invalidItems = orderItems.filter(item => !mongoose.Types.ObjectId.isValid(item.product));
    if (invalidItems.length > 0) {
      return res.status(400).json({ message: "Invalid product ID(s) detected in cart. Please clear your cart and try again." });
    }

    // 2. Get prices from DB
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x.product) },
    });

    if (itemsFromDB.length !== orderItems.length) {
      return res.status(404).json({ message: "One or more products not found" });
    }

    // 2. Map and calculate
    let calculatedItemsPrice = 0;
    const finalOrderItems = orderItems.map((clientItem) => {
      const dbProduct = itemsFromDB.find((x) => x._id.toString() === clientItem.product);
      
      if (dbProduct.countInStock < clientItem.qty) {
        throw new Error(`${dbProduct.name} is out of stock`);
      }

      // Check for discountPrice else fallback to price
      const priceToUse = dbProduct.discountPrice || dbProduct.price;

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

    const createdOrder = await order.save();

    // 3. Reduce stock
    for (const item of finalOrderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.qty }
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server Error" });
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
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update order status / deliver
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
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
