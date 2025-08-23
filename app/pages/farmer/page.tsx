// app/farmer/page.tsx
"use client";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {CalendarFold, ClipboardList, DollarSign, TruckElectric, TrendingUp} from "lucide-react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip
} from "recharts";

function MonthlySalesChart() {
    // Sample sales data
    const salesData = [
        {month: "Jan", sales: 1200},
        {month: "Feb", sales: 1800},
        {month: "Mar", sales: 2400},
        {month: "Apr", sales: 1600},
        {month: "May", sales: 2800},
        {month: "Jun", sales: 3200},
    ];

    const chartConfig = {
        sales: {
            label: "Sales",
            color: "rgba(34, 197, 94, 0.8)" // Tailwind green-500 with opacity
        }
    };

    return (
        <Card className="bg-white shadow h-full flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                    Monthly Sales
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <div className="h-full w-full">
                    <ChartContainer config={chartConfig}>
                        <BarChart data={salesData} margin={{top: 10, right: 20, left: 20, bottom: 10}}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                            <XAxis dataKey="month" tick={{fontSize: 12}}/>
                            <YAxis tickFormatter={(value: number) => `₹${value}`} tick={{fontSize: 12}}/>
                            <ChartTooltip content={<ChartTooltipContent/>}/>
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]}/>
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm mt-auto border-t pt-3">
                <div className="flex gap-2 leading-none font-medium text-green-600">
                    Trending up by 23% this month <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="text-muted-foreground leading-none">
                    Total sales: ₹13,000
                </div>
            </CardFooter>
        </Card>
    );
}

const CardInfo = [
    {title: "Total Earnings", value: 9700, icon: <DollarSign/>, description: "From crop residue"},
    {title: "Active Orders", value: 1, icon: <ClipboardList/>, description: "Current active orders"},
    {title: "Pending Pickups", value: 0, icon: <TruckElectric/>, description: "Awaiting pickups"},
    {title: "All Listings", value: 5, icon: <CalendarFold/>, description: "Total crop listings"}

]


interface CardInfo {
    title: string;
    value: number;
    icon: React.ReactNode;
    description: string;
}

export default function FarmerDashboard() {
    const [listings, setListings] = useState([
        {id: 1, crop: "Paddy", qty: 1200, price: 3.8, status: "Open"},
        {id: 2, crop: "Wheat", qty: 800, price: 3.2, status: "Ordered"}
    ]);

    const handlePickup = (id: number) => {
        setListings(listings.map(l =>
            l.id === id ? {...l, status: "Pickup Requested"} : l
        ));
    };


    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Farmer Dashboard</h1>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CardInfo.map((card, index) => (
                    <SummaryCard cardInfo={card} key={index}/>
                ))}

            </div>

            {/* Recent Listings */}
            <div className="bg-white p-4 rounded-xl shadow">
                <h2 className="text-lg font-semibold mb-2">Recent Listings</h2>
                <table className="w-full text-left">
                    <thead>
                    <tr className="border-b">
                        <th>Crop</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {listings.map(l => (
                        <tr key={l.id} className="border-b">
                            <td>{l.crop}</td>
                            <td>{l.qty} kg</td>
                            <td>₹{l.price}/kg</td>
                            <td><StatusBadge status={l.status}/></td>
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
            <div className={'grid md:grid-cols-2 gap-4'}>
                <MonthlySalesChart/>
                <ToolCard title={"AI Price Prediction"} value={"₹4.0/kg"}/>
            </div>
        </div>
    );
}

function SummaryCard({cardInfo}: { cardInfo: CardInfo }) {
    return (
        <Card
            className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 hover:translate-y-[-5px]">
            <CardHeader className="pb-2">
                <CardTitle>
                    <div className="flex items-center gap-5">
                        <div
                            className="p-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md">
                            {cardInfo.icon}
                        </div>
                        <h2 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{cardInfo.title}</h2>
                    </div>
                </CardTitle>
                <CardDescription className="text-gray-600">{cardInfo.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="flex items-center space-x-2">
                    {cardInfo.title === "Total Earnings" && (
                        <span className="text-3xl font-bold text-green-600">₹</span>
                    )}
                    <div
                        className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">{cardInfo.value}</div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">This Month</span>
                    <span className="text-2xl text-blue-600 font-medium">+12.5%</span>
                </div>
            </CardContent>
        </Card>
    );
}

function StatusBadge({status}: { status: string }) {
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

function ToolCard({title, value}: { title: string; value: string }) {
    return (
        <Card className="bg-white shadow h-full flex flex-col bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-md">
                        <TrendingUp className="h-5 w-5"/>
                    </div>
                    {title}
                </CardTitle>
                <CardDescription>AI-powered market predictions</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center">
                <div
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                    {value}
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm mt-auto border-t pt-3">
                <div className="flex gap-2 leading-none font-medium text-blue-600">
                    Based on current market data
                </div>
                <div className="text-muted-foreground leading-none">
                    Updated 2 hours ago
                </div>
            </CardFooter>
        </Card>
    );
}
