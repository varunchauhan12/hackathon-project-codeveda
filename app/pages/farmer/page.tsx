// app/farmer/page.tsx
"use client";
import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {CalendarFold, ClipboardList, DollarSign, TruckElectric, TrendingUp, Leaf, BarChart3} from "lucide-react";
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
    Tooltip,
    Legend
} from "recharts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import "./farmer.css";

function MonthlySalesChart() {
    // Sample sales data - expanded with multiple data points
    const salesData = [
        { month: "Jan", sales: 1200, revenue: 4800, target: 1500 },
        { month: "Feb", sales: 1800, revenue: 7200, target: 1800 },
        { month: "Mar", sales: 2400, revenue: 9600, target: 2000 },
        { month: "Apr", sales: 1600, revenue: 6400, target: 2200 },
        { month: "May", sales: 2800, revenue: 11200, target: 2400 },
        { month: "Jun", sales: 3200, revenue: 12800, target: 2600 },
    ];

    const chartConfig = {
        sales: {
            label: "Residue Sales (kg)",
            color: "rgba(34, 197, 94, 0.9)" // Bright green
        },
        revenue: {
            label: "Revenue (₹)",
            color: "rgba(59, 130, 246, 0.8)" // Blue
        },
        target: {
            label: "Target (kg)",
            color: "rgba(249, 115, 22, 0.5)" // Orange with transparency
        }
    };

    return (
        <Card className="bg-white/95 shadow-lg h-full flex flex-col border border-green-100 overflow-hidden">
            <CardHeader className="pb-0 border-b border-green-50">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    <span className="bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent">
                        Monthly Performance
                    </span>
                </CardTitle>
                <CardDescription className="text-green-700/80">
                    Track your crop residue sales and revenue
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden pt-4">
                <div className="h-full w-full">
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            data={salesData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            barGap={2}
                            barCategoryGap={10}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(22, 163, 74, 0.1)" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 12, fill: "#16a34a" }}
                                axisLine={{ stroke: "#dcfce7" }}
                            />
                            <YAxis
                                tickFormatter={(value: number) => `₹${value}`}
                                tick={{ fontSize: 12, fill: "#16a34a" }}
                                axisLine={{ stroke: "#dcfce7" }}
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                                cursor={{ fill: "rgba(22, 163, 74, 0.05)" }}
                            />
                            <Legend
                                wrapperStyle={{ paddingTop: "10px" }}
                                iconType="circle"
                            />
                            <Bar
                                dataKey="sales"
                                fill="var(--color-sales)"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1500}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="var(--color-revenue)"
                                radius={[4, 4, 0, 0]}
                                animationDuration={1500}
                                animationBegin={300}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-3 mt-auto border-t border-green-100 pt-4 pb-4 bg-gradient-to-r from-green-50/50 to-transparent">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Total Volume</span>
                        <span className="text-xl font-bold text-green-700">13,000 kg</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">Total Revenue</span>
                        <span className="text-xl font-bold text-blue-600">₹52,000</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 w-full pt-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[85%]"></div>
                    </div>
                    <span className="text-sm font-medium text-green-700 flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5" />
                        +23% YoY
                    </span>
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

const RecentListingsInfo = [
    {sno: 1, qty: "1200 kg", price: 4000 , status : "Open"},
    {sno: 2, qty: "800 kg", price: 3200 , status: "Delivered"},
    {sno: 3, qty: "1500 kg", price: 450 , status: "Pickup Requested"},
    {sno: 4, qty: "600 kg", price: 2400 , status: "Paid"}
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

    // Calculate growth percentages based on listing data
    const calculateGrowth = (title: string) => {
        // In a real app, this would use actual data calculations
        // For demo, using different values based on card type
        switch(title) {
            case "Total Earnings": return "+18.7%";
            case "Active Orders": return "+5.2%";
            case "Pending Pickups": return "0.0%";
            case "All Listings": return "+24.3%";
            default: return "+12.5%";
        }
    };

    const handlePickup = (id: number) => {
        setListings(listings.map(l =>
            l.id === id ? {...l, status: "Pickup Requested"} : l
        ));
    };

    return (
        <div className="min-h-screen dot-pattern page-gradient">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <header className="flex items-center justify-between pb-2 border-b border-green-100">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent">
                            Farmer Dashboard
                        </h1>
                        <p className="text-gray-600 mt-1">Manage your crop residue listings and track sales</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg shadow-sm border border-green-100">
                        <Leaf className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">CodeVeda Marketplace</span>
                    </div>
                </header>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {CardInfo.map((card, index) => (
                        <SummaryCard
                            cardInfo={card}
                            key={index}
                            growthPercent={calculateGrowth(card.title)}
                        />
                    ))}
                </div>

                {/* Recent Listings */}
                <div className="bg-white/90 p-5 rounded-xl shadow-md border border-green-50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                            Recent Listings
                        </h2>
                        <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white text-sm rounded-lg shadow-sm hover:shadow-md transition-all">
                            + New Listing
                        </button>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-green-100">
                        <Table>
                            <TableCaption className="text-green-700">
                                A list of your recent crop residue listings
                            </TableCaption>
                            <TableHeader>
                                <TableRow className="bg-green-50/50">
                                    <TableHead className="w-[100px] font-semibold text-green-900">Sno.</TableHead>
                                    <TableHead className="font-semibold text-green-900">Listing Quantity</TableHead>
                                    <TableHead className="font-semibold text-green-900">Listing Price</TableHead>
                                    <TableHead className="font-semibold text-green-900">Status</TableHead>
                                    <TableHead className="font-semibold text-green-900">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {RecentListingsInfo.map((listing) => (
                                    <TableRow key={listing.sno} className="hover:bg-green-50/40 transition-colors">
                                        <TableCell className="font-medium">{listing.sno}</TableCell>
                                        <TableCell>{listing.qty}</TableCell>
                                        <TableCell className="font-medium text-green-700">₹{listing.price}</TableCell>
                                        <TableCell><StatusBadge status={listing.status}/></TableCell>
                                        <TableCell>
                                            {listing.status === "Open" && (
                                                <button className="px-2 py-1 text-xs bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-md shadow-sm hover:shadow transition-all">
                                                    Request Pickup
                                                </button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Tools */}
                <div className="grid md:grid-cols-2 gap-6">
                    <MonthlySalesChart/>
                    <ToolCard title={"AI Price Prediction"} value={"₹4.0/kg"}/>
                </div>
            </div>
        </div>
    );
}

function SummaryCard({cardInfo, growthPercent}: { cardInfo: CardInfo, growthPercent: string }) {
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
                    <span className="text-2xl text-blue-600 font-medium">{growthPercent}</span>
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
        <Card className="bg-white/95 shadow-lg h-full flex flex-col border border-green-100 overflow-hidden">
            <CardHeader className="pb-0 border-b border-green-50">
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
                    </div>
                    <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                        {title}
                    </span>
                </CardTitle>
                <CardDescription className="text-blue-700/80 pb-2">
                    AI-powered market insights for optimal pricing
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center py-8 px-4">
                <div className="relative mb-2">
                    <div className="absolute inset-0 blur-lg opacity-20 bg-blue-400 rounded-full"></div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent relative">
                        {value}
                    </div>
                </div>
                <div className="text-sm text-blue-700 mt-2 text-center">
                    Recommended selling price for your crop residue
                </div>

                <div className="w-full mt-8 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Market low</span>
                        <span className="text-gray-600">Market high</span>
                    </div>
                    <div className="relative h-2 w-full bg-gray-100 rounded-full">
                        <div className="absolute inset-y-0 left-0 w-[75%] bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></div>
                        <div className="absolute h-4 w-4 top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-indigo-500 rounded-full shadow-md"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>₹3.2/kg</span>
                        <span className="text-indigo-600 font-medium">Your price</span>
                        <span>₹4.8/kg</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-3 mt-auto border-t border-green-100 pt-4 pb-4 bg-gradient-to-r from-blue-50/50 to-transparent">
                <div className="flex justify-between w-full items-center">
                    <div className="flex gap-1 items-center text-blue-700">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">Price trending upward</span>
                    </div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                        +12% from last month
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 w-full">
                    <span className="flex-1">Based on 240 recent transactions • Updated 2 hours ago</span>
                </div>
            </CardFooter>
        </Card>
    );
}
