"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  NotebookPen,
  TrendingUp,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Calculator,
  Divide,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Journal", icon: NotebookPen, href: "/journal" },
  { label: "Active Trades", icon: TrendingUp, href: "/active-trades" },
  { label: "Reports", icon: BarChart, href: "/reports" },
  {
    label: "Position Size Calculator",
    icon: Calculator,
    collapsed: false,
    children: [
      {
        label: "Risk Based",
        href: "/position-size/risk-based",
        icon: Percent,
      },
      {
        label: "Equal Money Based",
        href: "/position-size/equal-money",
        icon: Divide,
      },
    ],
  },
  { label: "Settings", icon: Settings, href: "/settings" },
];
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen border-r dark:bg-muted transition-all duration-300 ease-in-out shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        {!collapsed && <h1 className="text-lg font-semibold">My Journal</h1>}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded hover:bg-muted-foreground/10 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex flex-col gap-1 mt-2">
        {menu.map((item) => (
          <SidebarItem
            key={item.href || item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={collapsed}
            children={item.children}
          />
        ))}
      </nav>
    </aside>
  );
}
