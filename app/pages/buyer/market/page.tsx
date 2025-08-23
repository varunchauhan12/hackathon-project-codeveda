"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

type ResidueItem = {
  id: string;
  farmer: string;
  biomassType: string;
  quantityKg: number;
  predictedPricePerKg: number;
  location: string;
  priceType: "Fixed" | "Auction";
};

export default function ParaliMarketplace() {
  const router = useRouter();

  const [residues] = useState<ResidueItem[]>([
    { id: "p1", farmer: "Priyanshu", biomassType: "Paddy Straw", quantityKg: 1200, predictedPricePerKg: 3.8, location: "Punjab", priceType: "Fixed" },
    { id: "p2", farmer: "Bhavya", biomassType: "Wheat Straw", quantityKg: 800, predictedPricePerKg: 3.2, location: "Haryana", priceType: "Auction" },
    { id: "p3", farmer: "Rajesh", biomassType: "Maize Stalks", quantityKg: 500, predictedPricePerKg: 2.9, location: "Maharashtra", priceType: "Fixed" },
    { id: "p4", farmer: "Sunita", biomassType: "Barley Residue", quantityKg: 900, predictedPricePerKg: 3.5, location: "Rajasthan", priceType: "Auction" },
    { id: "p5", farmer: "Anil", biomassType: "Jowar Stalks", quantityKg: 1100, predictedPricePerKg: 3.1, location: "Karnataka", priceType: "Fixed" },
    { id: "p6", farmer: "Meena", biomassType: "Cotton Residue", quantityKg: 700, predictedPricePerKg: 4.0, location: "Tamil Nadu", priceType: "Auction" },
    { id: "p7", farmer: "Rahul", biomassType: "Groundnut Stalks", quantityKg: 650, predictedPricePerKg: 3.6, location: "Andhra Pradesh", priceType: "Fixed" },
    { id: "p8", farmer: "Geeta", biomassType: "Sugarcane Bagasse", quantityKg: 1400, predictedPricePerKg: 3.9, location: "Uttar Pradesh", priceType: "Auction" },
    { id: "p9", farmer: "Amit", biomassType: "Sesame Stalks", quantityKg: 480, predictedPricePerKg: 3.3, location: "Bihar", priceType: "Fixed" },
    { id: "p10", farmer: "Kiran", biomassType: "Mustard Residue", quantityKg: 750, predictedPricePerKg: 3.7, location: "Punjab", priceType: "Auction" },
    { id: "p11", farmer: "Deepak", biomassType: "Peanut Shells", quantityKg: 550, predictedPricePerKg: 3.4, location: "Gujarat", priceType: "Fixed" },
  ]);

  // Filters state
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minQuantity, setMinQuantity] = useState<number | "">("");
  const [maxQuantity, setMaxQuantity] = useState<number | "">("");

  // Dropdown options
  const biomassTypes = Array.from(new Set(residues.map((r) => r.biomassType)));
  const locations = Array.from(new Set(residues.map((r) => r.location)));

  // Filtering logic
  const filteredResidues = useMemo(() => {
    return residues.filter((r) => {
      const matchesSearch =
        search === "" ||
        r.biomassType.toLowerCase().includes(search.toLowerCase()) ||
        r.farmer.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase());

      const matchesType = filterType === "" || r.biomassType === filterType;
      const matchesLocation = filterLocation === "" || r.location === filterLocation;
      const matchesQuantity =
        (minQuantity === "" || r.quantityKg >= minQuantity) &&
        (maxQuantity === "" || r.quantityKg <= maxQuantity);
      const matchesPrice =
        (minPrice === "" || r.predictedPricePerKg >= minPrice) &&
        (maxPrice === "" || r.predictedPricePerKg <= maxPrice);

      return matchesSearch && matchesType && matchesLocation && matchesQuantity && matchesPrice;
    });
  }, [residues, search, filterType, filterLocation, minPrice, maxPrice, minQuantity, maxQuantity]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">🌱 Parali Marketplace</h2>
        <button
          onClick={() => router.push("/buyer/orders")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          aria-label="Go to My Orders"
        >
          My Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by type, farmer or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">All Biomass Types</option>
          {biomassTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded px-3 py-2 w-1/2"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded px-3 py-2 w-1/2"
          />
        </div>
      </div>

      {/* Residue Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResidues.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            🚫 No biomass residues found with current filters.
          </p>
        ) : (
          filteredResidues.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition border flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.biomassType}</h3>
                <p className="text-gray-600 text-sm">
                  {item.quantityKg} kg • {item.location}
                </p>
                <p className="text-green-700 font-bold mt-2">
                  ₹{item.predictedPricePerKg.toFixed(2)}/kg (Predicted)
                </p>
                <p className="text-sm text-gray-500">Farmer: {item.farmer}</p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.priceType === "Fixed"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-purple-200 text-purple-800"
                  }`}
                >
                  {item.priceType}
                </span>
              </div>
              <button
                onClick={() => router.push(`/buyer/market/order/${item.id}`)}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 font-semibold transition"
              >
                {item.priceType === "Auction" ? "Place Bid" : "Order Now"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

