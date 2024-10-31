import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Users, Store, DollarSign } from "lucide-react"

export default function MatricCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 my-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Orders
          </CardTitle>
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">13,647</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs flex items-center text-green-600">
              <span className="inline-block mr-1">▲</span> 2.3%
              <span className="text-muted-foreground ml-1">Last Week</span>
            </p>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
              View More
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            New Leads
          </CardTitle>
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">9,526</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs flex items-center text-green-600">
              <span className="inline-block mr-1">▲</span> 8.1%
              <span className="text-muted-foreground ml-1">Last Month</span>
            </p>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
              View More
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Deals
          </CardTitle>
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">976</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs flex items-center text-red-600">
              <span className="inline-block mr-1">▼</span> 0.3%
              <span className="text-muted-foreground ml-1">Last Month</span>
            </p>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
              View More
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Booked Revenue
          </CardTitle>
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$123.6k</div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs flex items-center text-green-600">
              <span className="inline-block mr-1">▲</span> 10.6%
              <span className="text-muted-foreground ml-1">Last Month</span>
            </p>
            <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
              View More
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
