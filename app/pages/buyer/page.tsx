"use client";

import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";

type Order = {
  id: number;
  crop: string;
  qty: number;
  price: number;
  status: "Ordered" | "In Transit" | "Delivered";
  date: string;
};

export default function OrdersDashboard() {
  const [orders] = useState<Order[]>([
    { id: 1, crop: "Paddy Straw", qty: 1000, price: 3.9, status: "In Transit", date: "2025-08-01" },
    { id: 2, crop: "Wheat Straw", qty: 800, price: 3.2, status: "Delivered", date: "2025-08-05" },
    { id: 3, crop: "Maize Stalks", qty: 600, price: 2.9, status: "Delivered", date: "2025-08-10" },
    { id: 4, crop: "Sugarcane Bagasse", qty: 1200, price: 3.8, status: "Ordered", date: "2025-08-15" },
    { id: 5, crop: "Mustard Residue", qty: 750, price: 3.6, status: "In Transit", date: "2025-08-20" },
  ]);

  const activeOrders = orders.filter(o => o.status !== "Delivered").length;
  const completedOrders = orders.filter(o => o.status === "Delivered").length;
  const totalQty = orders.reduce((sum, o) => sum + o.qty, 0);
  const totalSpend = orders.reduce((sum, o) => sum + o.qty * o.price, 0);

  // Data for charts
  const monthlyData = [
    { month: "May", qty: 800 },
    { month: "Jun", qty: 1200 },
    { month: "Jul", qty: 1000 },
    { month: "Aug", qty: totalQty },
  ];

  const statusData = [
    { name: "Ordered", value: orders.filter(o => o.status === "Ordered").length },
    { name: "In Transit", value: orders.filter(o => o.status === "In Transit").length },
    { name: "Delivered", value: completedOrders },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <main className="pt-24 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 space-y-8">
      <h1 className="text-4xl font-extrabold text-green-700 mb-4 drop-shadow-md">
        📦 My Orders Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard title="Active Orders" value={activeOrders} />
        <SummaryCard title="Completed Orders" value={completedOrders} />
        <SummaryCard title="Total Quantity Bought" value={`${totalQty} kg`} />
        <SummaryCard title="Total Spend" value={`₹${totalSpend.toFixed(0)}`} />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Line Chart (Trend) */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Procurement Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="qty" stroke="#16a34a" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart (Status Distribution) */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                cx="50%" cy="50%"
                outerRadius={80}
                label
              >
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Crop</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-green-50 transition">
                <td className="py-2 px-4">{o.crop}</td>
                <td className="py-2 px-4">{o.qty} kg</td>
                <td className="py-2 px-4">₹{o.price}/kg</td>
                <td className="py-2 px-4">₹{(o.qty * o.price).toFixed(0)}</td>
                <td className="py-2 px-4">
                  <StatusBadge status={o.status} />
                </td>
                <td className="py-2 px-4">{o.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 text-center">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Ordered: "bg-yellow-200 text-yellow-800",
    "In Transit": "bg-blue-200 text-blue-800",
    Delivered: "bg-green-200 text-green-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status] || "bg-gray-200 text-gray-700"}`}>
      {status}
    </span>
  );
}


