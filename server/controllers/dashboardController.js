import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// @desc    Get dashboard analytics
// @route   GET /api/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Calculate total sales from delivered orders (or paid orders)
    const orders = await Order.find({ isPaid: true });
    const totalSales = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    const recentOrders = await Order.find({})
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .limit(5);
      
    // Fetch count per category
    const products = await Product.find({}).populate("category", "name");
    const categoryCounts = {};
    products.forEach(p => {
       if (p.category && p.category.name) {
           categoryCounts[p.category.name] = (categoryCounts[p.category.name] || 0) + 1;
       }
    });

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalSales,
      recentOrders,
      categoryCounts
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
