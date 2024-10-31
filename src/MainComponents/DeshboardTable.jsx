import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
  import { Badge } from "@/components/ui/badge"
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { MoreHorizontal } from "lucide-react"
  
  const orders = [
    { id: 1, user: "Esther Howard", avatar: "/placeholder.svg?height=32&width=32", invoice: "#324567", price: "$90.99", status: "Paid" },
    { id: 2, user: "Guy Hawkins", avatar: "/placeholder.svg?height=32&width=32", invoice: "#4224", price: "$78.65", status: "Due" },
    { id: 3, user: "Bessie Cooper", avatar: "/placeholder.svg?height=32&width=32", invoice: "#4224", price: "$78.65", status: "Pending" },
    { id: 4, user: "Kathryn Murphy", avatar: "/placeholder.svg?height=32&width=32", invoice: "#4224", price: "$38.65", status: "Canceled" },
    { id: 5, user: "Darrell Steward", avatar: "/placeholder.svg?height=32&width=32", invoice: "#4224", price: "$178.65", status: "Shipped" },
    { id: 6, user: "Darrell Steward", avatar: "/placeholder.svg?height=32&width=32", invoice: "#4224", price: "$74.65", status: "Canceled" },
  ]
  
  const statusColors = {
    Paid: "bg-green-100 text-green-800",
    Due: "bg-yellow-100 text-yellow-800",
    Pending: "bg-blue-100 text-blue-800",
    Canceled: "bg-red-100 text-red-800",
    Shipped: "bg-purple-100 text-purple-800",
  }
  
  export default function DeshboardTable() {
    return (
      <Card className="w-full max-w-4x2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">USER</TableHead>
                <TableHead>INVOICE</TableHead>
                <TableHead>PRICE</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={order.avatar} alt={order.user} />
                        <AvatarFallback>{order.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {order.user}
                    </div>
                  </TableCell>
                  <TableCell>{order.invoice}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[order.status]}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  }