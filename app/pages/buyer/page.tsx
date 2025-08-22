// app/buyer/page.tsx
"use client";
import { useState } from "react";

export default function BuyerDashboard() {
    const [orders, setOrders] = useState([
        { id: 1, crop: "Paddy", qty: 1000, price: 3.9, status: "In Transit" },
        { id: 2, crop: "Wheat", qty: 800, price: 3.2, status: "Delivered" }
    ]);

    const [market, setMarket] = useState([
        { id: "r1", farmer: "Priyanshu", crop: "Paddy", qty: 1200, price: 3.8, location: "Punjab", type: "Fixed" },
        { id: "r2", farmer: "Bhavya", crop: "Wheat", qty: 800, price: 3.2, location: "Haryana", type: "Auction" }
    ]);

    const placeOrder = (id: string) => {
        const item = market.find(m => m.id === id);
        if (!item) return;
        setOrders([...orders, { id: orders.length + 1, crop: item.crop, qty: item.qty, price: item.price, status: "Ordered" }]);
        alert(`Order placed for ${item.crop}!`);
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Buyer Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard title="Active Orders" value={orders.filter(o => o.status !== "Delivered").length} />
                <SummaryCard title="Completed Orders" value={orders.filter(o => o.status === "Delivered").length} />
                <SummaryCard title="Total Bought" value={`${orders.reduce((a, o) => a + o.qty, 0)} kg`} />
                <SummaryCard title="Escrow Balance" value="₹15,000" />
            </div>

            {/* Market Preview */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Available Residues</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    {market.map(item => (
                        <div key={item.id} className="p-4 border rounded-xl shadow-sm bg-gray-50 flex flex-col justify-between">
                            <div>
                                <p className="font-semibold">{item.crop}</p>
                                <p>{item.qty} kg • {item.location}</p>
                                <p className="text-green-700 font-bold">₹{item.price}/kg</p>
                                <span className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                                    item.type === "Fixed" ? "bg-blue-200 text-blue-800" : "bg-purple-200 text-purple-800"
                                }`}>
                  {item.type}
                </span>
                            </div>
                            <button
                                onClick={() => placeOrder(item.id)}
                                className="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                            >
                                Order Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">My Recent Orders</h2>
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th>Crop</th><th>Quantity</th><th>Price</th><th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(o => (
                        <tr key={o.id} className="border-b">
                            <td>{o.crop}</td>
                            <td>{o.qty} kg</td>
                            <td>₹{o.price}/kg</td>
                            <td><StatusBadge status={o.status} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SummaryCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        Ordered: "bg-yellow-200 text-yellow-800",
        "In Transit": "bg-blue-200 text-blue-800",
        Delivered: "bg-green-200 text-green-800"
    };
    return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || "bg-gray-200"}`}>
      {status}
    </span>
    );
}
