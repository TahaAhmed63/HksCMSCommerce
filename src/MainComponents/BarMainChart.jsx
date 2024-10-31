"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip
} from "recharts"

const data = [
  { month: "Jan", pageViews: 32, clicks: 5 },
  { month: "Feb", pageViews: 62, clicks: 10 },
  { month: "Mar", pageViews: 42, clicks: 7 },
  { month: "Apr", pageViews: 65, clicks: 12 },
  { month: "May", pageViews: 45, clicks: 20 },
  { month: "Jun", pageViews: 58, clicks: 15 },
  { month: "Jul", pageViews: 40, clicks: 5 },
  { month: "Aug", pageViews: 42, clicks: 8 },
  { month: "Sep", pageViews: 75, clicks: 10 },
  { month: "Oct", pageViews: 50, clicks: 25 },
  { month: "Nov", pageViews: 62, clicks: 18 },
  { month: "Dec", pageViews: 65, clicks: 30 }
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm my-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Clicks
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default function BarMainChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-normal">Performance</CardTitle>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="1m">1M</TabsTrigger>
            <TabsTrigger value="6m">6M</TabsTrigger>
            <TabsTrigger value="1y">1Y</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
              }}
            >
              <CartesianGrid
                stroke="hsl(var(--border))"
                vertical={false}
                strokeDasharray="4 4"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="pageViews"
                fill="rgb(249, 116, 21)"
                radius={[4, 4, 0, 0]}
                name="Page Views"
                barSize={30}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={false}
                name="Clicks"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Page Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Clicks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
