import { useEffect, useState } from "react";
import api from "../../api/api";
import { FiBox, FiShoppingCart, FiUsers, FiDollarSign } from "react-icons/fi";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!stats) return <div>Error loading stats</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
             <FiDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Sales</p>
            <h3 className="text-2xl font-bold text-slate-800">₹{stats.totalSales}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 mr-4">
             <FiShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Orders</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalOrders}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
             <FiBox size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Products</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalProducts}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-lg bg-orange-100 text-orange-600 mr-4">
             <FiUsers size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Users</p>
            <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders?.map((order) => (
                <tr key={order._id} className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium">{order._id.substring(18,24)}</td>
                  <td className="px-6 py-4">{order.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">₹{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Shipped' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {(!stats.recentOrders || stats.recentOrders.length === 0) && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-slate-500">No recent orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
