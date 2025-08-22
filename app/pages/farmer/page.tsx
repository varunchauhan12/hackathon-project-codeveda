// app/farmer/page.tsx
"use client";
import { useState } from "react";

export default function FarmerDashboard() {
    const [listings, setListings] = useState([
        { id: 1, crop: "Paddy", qty: 1200, price: 3.8, status: "Open" },
        { id: 2, crop: "Wheat", qty: 800, price: 3.2, status: "Ordered" }
    ]);

    const handlePickup = (id: number) => {
        setListings(listings.map(l =>
            l.id === id ? { ...l, status: "Pickup Requested" } : l
        ));
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Farmer Dashboard</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SummaryCard title="Total Listings" value={listings.length} />
                <SummaryCard title="Active Orders" value="1" />
                <SummaryCard title="Pending Pickups" value="0" />
                <SummaryCard title="Earnings" value="₹9,500" />
            </div>

            {/* Recent Listings */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Recent Listings</h2>
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th>Crop</th><th>Quantity</th><th>Price</th><th>Status</th><th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listings.map(l => (
                        <tr key={l.id} className="border-b">
                            <td>{l.crop}</td>
                            <td>{l.qty} kg</td>
                            <td>₹{l.price}/kg</td>
                            <td><StatusBadge status={l.status} /></td>
                            <td>
                                {l.status === "Open" && (
                                    <button
                                        onClick={() => handlePickup(l.id)}
                                        className="px-2 py-1 text-sm bg-green-600 text-white rounded"
                                    >
                                        Request Pickup
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Tools */}
            <div className="grid md:grid-cols-2 gap-4">
                <ToolCard title="Estimate Yield (Satellite)" value="≈ 800 kg" />
                <ToolCard title="AI Price Prediction" value="₹3.8/kg" />
            </div>
        </div>
    );
}

function SummaryCard({ title, value }: { title: string; value: string | number }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow text-center ">
            <p className="text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        Open: "bg-yellow-200 text-yellow-800",
        Ordered: "bg-blue-200 text-blue-800",
        "Pickup Requested": "bg-purple-200 text-purple-800",
        Paid: "bg-green-200 text-green-800"
    };
    return (
        <span className={`px-2 py-1 rounded text-sm ${colors[status] || "bg-gray-200"}`}>
      {status}
    </span>
    );
}

function ToolCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-green-700 text-lg font-bold">{value}</p>
        </div>
    );
}
