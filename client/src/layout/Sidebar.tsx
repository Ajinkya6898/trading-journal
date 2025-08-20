import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Paper,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FilePlus,
  Activity,
  BarChart3,
  SlidersHorizontal,
  GaugeCircle,
  Scale,
  ChevronDown,
  IndianRupee,
  CandlestickChart,
  Banknote,
  CreditCard,
} from "lucide-react";
import { useState } from "react";
import AppLogo from "./AppLogo";

const menu = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Stock Journal", icon: CandlestickChart, href: "/stocks-journal" },
  {
    label: "Mutual Fund Journal",
    icon: Banknote,
    href: "/mutual-funds-journal",
  },
  { label: "Add New Entry", icon: FilePlus, href: "/add-entry" },
  { label: "Active Trades", icon: Activity, href: "/active-trades" },
  { label: "Reports", icon: BarChart3, href: "/stocks-report" },
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
  {
    label: "Pricing",
    icon: CreditCard,
    href: "/pricing",
  },
];

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActive = (href: string) => location.pathname === href;

  const isAnyChildActive = (children: typeof menu) =>
    children.some((child) => child.href && isActive(child.href));

  const toggleGroup = (label: string) => {
    setOpenGroup(openGroup === label ? null : label);
  };

  const getActiveStyles = (active: boolean) => ({
    borderRadius: "8px",
    mb: 0.25,
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    color: active ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.1)
      : "transparent",
    minHeight: "36px",

    "&:hover": {
      backgroundColor: active
        ? alpha(theme.palette.primary.main, 0.15)
        : alpha(theme.palette.action.hover, 0.06),
      transform: "translateX(2px)",
    },

    "&::before": active
      ? {
          content: '""',
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "3px",
          height: "16px",
          background: theme.palette.primary.main,
          borderRadius: "0 2px 2px 0",
        }
      : {},
  });

  const getIconStyles = (active: boolean) => ({
    minWidth: 28,
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    transition: "all 0.2s ease-in-out",
    mx: 0.5,
    "& svg": {
      filter: active
        ? `drop-shadow(0 1px 2px ${alpha(theme.palette.primary.main, 0.2)})`
        : "none",
    },
  });

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.lightest} 0%, ${theme.palette.gray.lightest} 100%)`,
        borderRight: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
          borderRadius: "2px",
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.25),
          },
        },
      }}
    >
      <Box sx={{ px: 1.5, pt: 1.5 }}>
        <Box sx={{ mb: 2 }}>
          <AppLogo />
        </Box>

        <Divider
          sx={{
            mb: 2,
            mx: 0.5,
            background: alpha(theme.palette.primary.main, 0.1),
            height: "1px",
          }}
        />

        <List disablePadding sx={{ px: 0.5 }}>
          {menu.map((item) => {
            const isGroup = !!item.children;
            const isOpen = openGroup === item.label;
            const childActive = isGroup && isAnyChildActive(item.children);

            if (isGroup) {
              return (
                <Box key={item.label} sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => toggleGroup(item.label)}
                    selected={childActive}
                    sx={{
                      ...getActiveStyles(childActive),
                      py: 0.75,
                      px: 1,
                    }}
                  >
                    <ListItemIcon sx={getIconStyles(childActive)}>
                      <item.icon
                        size={18}
                        strokeWidth={childActive ? 2 : 1.5}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                      }}
                    />
                    <Box
                      sx={{
                        transition: "transform 0.2s ease-in-out",
                        transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                        color: childActive
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        ml: 0.5,
                      }}
                    >
                      <ChevronDown size={14} />
                    </Box>
                  </ListItemButton>

                  <Collapse in={isOpen} timeout={250} unmountOnExit>
                    <List
                      component="div"
                      disablePadding
                      sx={{ pl: 1, mt: 0.25 }}
                    >
                      {item.children.map((child) => {
                        const active = isActive(child.href);
                        return (
                          <ListItemButton
                            key={child.label}
                            component={NavLink}
                            to={child.href}
                            selected={active}
                            sx={{
                              ...getActiveStyles(active),
                              py: 0.5,
                              px: 1,
                              ml: 0.5,
                              borderRadius: "6px",
                              minHeight: "32px",
                              position: "relative",
                              "&::before": active
                                ? {
                                    content: '""',
                                    position: "absolute",
                                    left: -8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: "2px",
                                    height: "12px",
                                    background: theme.palette.primary.main,
                                    borderRadius: "1px",
                                  }
                                : {},
                            }}
                          >
                            <ListItemIcon sx={getIconStyles(active)}>
                              <child.icon
                                size={18}
                                strokeWidth={active ? 2 : 1.5}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{
                                fontSize: 12,
                                fontWeight: 500,
                                letterSpacing: "-0.01em",
                                lineHeight: 1.2,
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
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
                  ...getActiveStyles(active),
                  py: 0.75,
                  px: 1,
                  mb: 0.25,
                }}
              >
                <ListItemIcon sx={getIconStyles(active)}>
                  <item.icon strokeWidth={active ? 2 : 1.5} size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default Sidebar;
