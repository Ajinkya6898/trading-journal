import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  collapsed: boolean;
  children?: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}

export default function SidebarItem({
  icon: Icon,
  label,
  href,
  collapsed,
  children,
}: SidebarItemProps) {
  const [open, setOpen] = useState(false);

  if (children && children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center px-4 py-2 w-full text-left text-sm font-medium hover:bg-muted transition",
            collapsed ? "justify-center" : "justify-between"
          )}
        >
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </div>
          {!collapsed &&
            (open ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </button>
        {!collapsed && open && (
          <div className="ml-8 space-y-1 mt-1">
            {children.map((child) => (
              <NavLink
                to={child.href}
                key={child.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-md",
                    isActive && "bg-gray-200 text-primary",
                    collapsed ? "justify-center" : "justify-start gap-3"
                  )
                }
              >
                <child.icon className="w-4 h-4" />
                <span>{child.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={href!}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-md",
          isActive && "bg-gray-200 text-primary",
          collapsed ? "justify-center" : "justify-start gap-3"
        )
      }
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
