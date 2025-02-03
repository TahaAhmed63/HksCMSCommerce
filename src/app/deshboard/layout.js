// app/dashboard/layout.js
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
import { Provider } from 'react-redux';
import { store } from '@/store/store'; // Adjust the path if necessary

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
      <Provider store={store}>
        <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-[#1e2530] text-white w-64 min-h-screen ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
         
      <Sidebar />
        </aside>
        <div className="flex-1 flex flex-col ">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 ml-2">WELCOME!</h2>
            </div>
            <div className="flex items-center space-x-4">
              <Input type="search" placeholder="Search..." className="w-64" />
              <Button size="icon" variant="ghost">
                <Bell className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <HelpCircle className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Moon className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <main style={{overflow:"scroll",height:"100%"}}>{children}</main>
      </div>
      </div>
      </Provider>
    );
  }
  