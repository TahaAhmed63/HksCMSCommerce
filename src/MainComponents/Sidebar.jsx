"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  Layers,
  Box,
  ShoppingBag,
  CreditCard,
  Sparkles,
  Receipt,
  Settings,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"

const menuData = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard"
  },
  {
    title: "Products",
    icon: Package,
    subMenu: [
      { title: "List", link: "/deshboard/Product/main" },
      // { title: "Grid", link: "/products/grid" },
      // { title: "Details", link: "/products/details" },
      // { title: "Edit", link: "/products/edit" },
      { title: "Create", link: "/deshboard/Product/Create" },
      { title: "catagories", link: "/deshboard/catagories/create" },
      {title: "Attributes", link: "/deshboard/Attributes/create"},

    ]
  },
,
  {
    title: "Inventory",
    icon: Box,
    subMenu: [
      { title: "Warehouse", link: "/inventory/warehouse" },
      { title: "Received Orders", link: "/inventory/received-orders" }
    ]
  },
  {
    title: "Orders",
    icon: ShoppingBag,
    subMenu: [
      { title: "List", link: "/orders/list" },
      { title: "Details", link: "/orders/details" },
      { title: "Cart", link: "/orders/cart" },
      { title: "Check Out", link: "/orders/checkout" }
    ]
  },
  {
    title: "Purchases",
    icon: CreditCard,
    subMenu: [
      { title: "List", link: "/purchases/list" },
      { title: "Order", link: "/purchases/order" },
      { title: "Return", link: "/purchases/return" }
    ]
  },
  {
    title: "Attributes",
    icon: Sparkles,
    subMenu: [
      { title: "List", link: "/attributes/list" },
      { title: "Edit", link: "/attributes/edit" },
      { title: "Create", link: "/deshboard/Attributes/create" }
    ]
  },
  {
    title: "Variation",
    icon: Sparkles,
    subMenu: [
      { title: "List", link: "/Variation/list" },
      { title: "Edit", link: "/Variation/edit" },
      { title: "Create", link: "/deshboard/variation/create" }
    ]
  },
  {
    title: "Invoices",
    icon: Receipt,
    subMenu: [
      { title: "List", link: "/invoices/list" },
      { title: "Details", link: "/invoices/details" },
      { title: "Create", link: "/invoices/create" }
    ]
  },
  {
    title: "Settings",
    icon: Settings,
    link: "/settings"
  }
]

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "relative bg-[#1e2530] text-white transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <div className="bg-orange-500 p-2 rounded">
          <ShoppingBag className="w-5 h-5" />
        </div>
        {!isCollapsed && <span className="font-semibold text-lg">Larkon</span>}
      </div>

      {/* Menu Section Title */}
      <div className="px-4 py-3">
        <span className="text-xs font-medium text-gray-400">GENERAL</span>
      </div>

      {/* Menu Items */}
      <nav className="px-2">
        {menuData.map((item, index) => {
          const Icon = item.icon

          if (!item.subMenu) {
            return (
              <a
                key={index}
                href={item.link}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span>{item.title}</span>}
              </a>
            )
          }

          return (
            <Collapsible
              key={index}
              open={openMenus.includes(item.title)}
              onOpenChange={() => {
                setOpenMenus(prev =>
                  prev.includes(item.title)
                    ? prev.filter(menu => menu !== item.title)
                    : [...prev, item.title]
                )
              }}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
                {!isCollapsed &&
                  (openMenus.includes(item.title) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  ))}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div
                  className={cn(
                    "space-y-1",
                    isCollapsed
                      ? "absolute left-full top-0 ml-2 w-48 rounded-md border bg-[#1e2530] p-2"
                      : "pl-8"
                  )}
                >
                  {item.subMenu.map((subItem, subIndex) => (
                    <a
                      key={subIndex}
                      href={subItem.link}
                      className="block py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {subItem.title}
                    </a>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </nav>

      {/* Users Section Title */}
      <div className="px-4 py-3 mt-4">
        <span className="text-xs font-medium text-gray-400">USERS</span>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-64 top-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronRight
          className={cn(
            "w-4 h-4 transition-transform",
            isCollapsed ? "rotate-180" : ""
          )}
        />
      </Button>
    </div>
  )
}
