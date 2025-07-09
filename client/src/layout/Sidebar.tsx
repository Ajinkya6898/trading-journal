import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  FilePlus,
  Activity,
  BarChart3,
  SlidersHorizontal,
  GaugeCircle,
  Scale,
  Settings2,
  ChevronDown,
  ChevronRight,
  IndianRupee,
} from "lucide-react";
import { useState } from "react";
import AppLogo from "./AppLogo";

const menu = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Journal", icon: FileText, href: "/journal" },
  { label: "Add New Entry", icon: FilePlus, href: "/add-entry" },
  { label: "Active Trades", icon: Activity, href: "/active-trades" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  {
    label: "Position Size Calculator",
    icon: SlidersHorizontal,
    children: [
      {
        label: "Risk Based",
        href: "/position-size/risk-based",
        icon: GaugeCircle,
      },
      {
        label: "Equal Money Based",
        href: "/position-size/equal-money",
        icon: Scale,
      },
    ],
  },
  {
    label: "Fund Transactions",
    icon: IndianRupee,
    href: "/fund-transactions",
  },
  { label: "Settings", icon: Settings2, href: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActive = (href: string) => location.pathname === href;

  const isAnyChildActive = (children: typeof menu) =>
    children.some((child) => isActive(child.href));

  const toggleGroup = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };
  return (
    <Box pl={"10px"} pr={"40px"}>
      <AppLogo />
      <List disablePadding sx={{ px: 1 }}>
        {menu.map((item) => {
          const isGroup = !!item.children;
          const isOpen = openGroup === item.label;
          const childActive = isGroup && isAnyChildActive(item.children);

          if (isGroup) {
            return (
              <div key={item.label}>
                <ListItemButton
                  onClick={() => toggleGroup(item.label)}
                  selected={childActive}
                  sx={{
                    borderRadius: "10px",
                    py: 0.5,
                    minHeight: 36,
                    mb: 0.25,
                    color: childActive ? "primary.main" : "background.default",
                    backgroundColor: childActive
                      ? "primary.lighter"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 28,
                      color: childActive
                        ? "primary.main"
                        : "background.default",
                    }}
                  >
                    <item.icon size={16} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  />
                  {isOpen ? (
                    <ChevronDown size={14} />
                  ) : (
                    <ChevronRight size={14} />
                  )}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 3 }}>
                    {item.children.map((child) => {
                      const active = isActive(child.href);
                      return (
                        <ListItemButton
                          key={child.label}
                          component={NavLink}
                          to={child.href}
                          selected={active}
                          sx={{
                            borderRadius: "10px",
                            py: 0.5,
                            minHeight: 34,
                            mb: 0.25,
                            color: active
                              ? "primary.dark"
                              : "background.default",
                            backgroundColor: active
                              ? "primary.lighter"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 28,
                              color: active
                                ? "primary.dark"
                                : "background.default",
                            }}
                          >
                            <child.icon size={15} />
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            primaryTypographyProps={{
                              fontSize: 14,
                              fontWeight: 500,
                            }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          }

          const active = isActive(item.href);

          return (
            <ListItemButton
              key={item.label}
              component={NavLink}
              to={item.href}
              selected={active}
              sx={{
                borderRadius: "10px",
                py: 0,
                minHeight: 36,
                mb: 0.25,
                color: active ? "primary.dark" : "background.default",
                backgroundColor: active ? "primary.lighter" : "transparent",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  color: active ? "primary.dark" : "background.default",
                }}
              >
                <item.icon strokeWidth={1.5} size={16} />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
