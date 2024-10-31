"use client"

import { useState } from "react"
import { Bell, ChevronDown,TrendingUp , HelpCircle, Menu, Moon, Search,MoreHorizontal  } from "lucide-react"
import {  Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AreaChart, BarChart, XAxis, YAxis, Tooltip, Area, Bar, CartesianGrid, ResponsiveContainer, Line } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DeshboardTable from "@/MainComponents/DeshboardTable"
import Sidebar from "@/MainComponents/Sidebar"
import MatricCard from "@/MainComponents/MatricCard"
import BarMainChart from "@/MainComponents/BarMainChart"
export default function AdminDashboardClient() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const data = [
    { month: "Feb", visitors: 70 },
    { month: "Mar", visitors: 85 },
    { month: "Apr", visitors: 60 },
    { month: "May", visitors: 80 },
    { month: "Jun", visitors: 70 },
    { month: "Jul", visitors: 90 },
  ]
  const revenuedata = [
    { month: "Feb", netProfit: 45, revenue: 75, freeCashFlow: 35 },
    { month: "Mar", netProfit: 55, revenue: 85, freeCashFlow: 40 },
    { month: "Apr", netProfit: 57, revenue: 100, freeCashFlow: 35 },
    { month: "May", netProfit: 55, revenue: 98, freeCashFlow: 25 },
    { month: "Jun", netProfit: 60, revenue: 87, freeCashFlow: 45 },
    { month: "Jul", netProfit: 58, revenue: 105, freeCashFlow: 50 },
    { month: "Aug", netProfit: 62, revenue: 92, freeCashFlow: 52 },
    { month: "Sep", netProfit: 60, revenue: 115, freeCashFlow: 53 },
    { month: "Oct", netProfit: 65, revenue: 95, freeCashFlow: 40 },
  ]
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  }
  const menuData = [
    {
 title: "Dashboard",
 icon: "solar:widget-5-bold-duotone",
    },
    {
        title: "Inventory",
        icon: "solar:box-bold-duotone",
        subMenu: [
            { title: "Warehouse", link: "inventory-warehouse.html" },
            { title: "Received Orders", link: "inventory-received-orders.html" }
        ]
    },
    {
        title: "Orders",
        icon: "solar:bag-smile-bold-duotone",
        subMenu: [
            { title: "List", link: "orders-list.html" },
            { title: "Details", link: "order-detail.html" },
            { title: "Cart", link: "order-cart.html" },
            { title: "Check Out", link: "order-checkout.html" }
        ]
    },
    {
        title: "Purchases",
        icon: "solar:card-send-bold-duotone",
        subMenu: [
            { title: "List", link: "purchase-list.html" },
            { title: "Order", link: "purchase-order.html" },
            { title: "Return", link: "purchase-returns.html" }
        ]
    },
    {
        title: "Attributes",
        icon: "solar:confetti-minimalistic-bold-duotone",
        subMenu: [
            { title: "List", link: "attributes-list.html" },
            { title: "Edit", link: "attributes-edit.html" },
            { title: "Create", link: "attributes-add.html" }
        ]
    },
    {
        title: "Invoices",
        icon: "solar:bill-list-bold-duotone",
        subMenu: [
            { title: "List", link: "invoice-list.html" },
            { title: "Details", link: "invoice-details.html" },
            { title: "Create", link: "invoice-add.html" }
        ]
    },
    {
        title: "Settings",
        icon: "solar:settings-bold-duotone",
        link: "settings.html"
    },
    {
        title: "Users",
        isMenuTitle: true
    }
];


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded p-2 shadow-sm">
          <p className="text-sm font-medium">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  return (

     
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-6" role="alert">
              <p>We regret to inform you that our server is currently experiencing technical difficulties.</p>
            </div>

            {/* Metric Cards */}
        <MatricCard/>

            {/* Performance Chart */}
         

<BarMainChart/>
            {/* Additional Charts and Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 my-3">
            <Card className="w-full max-w-4xl my-3">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Revenue Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenuedata} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 120]}
              />
              <Bar dataKey="netProfit" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="freeCashFlow" fill="hsl(25, 95%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>

          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-8">
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(217,91%,60%)]" />
            <span className="text-sm text-muted-foreground">Net Profit</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(199,89%,48%)]" />
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-[hsl(25,95%,53%)]" />
            <span className="text-sm text-muted-foreground">Free Cash Flow</span>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card className="w-full max-w-3x2 mb-5 my-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-base font-normal">Visitors Report</CardTitle>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                dx={-10}
                domain={[60, 90]}
                ticks={[60, 65, 70, 75, 80, 85, 90]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
          
            </div>

            {/* Recent Orders Table */}
        <DeshboardTable/>
          </div>
        </main>
     
  )
}