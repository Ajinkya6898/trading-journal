import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Typography,
  Box,
  ListItemIcon,
  Divider,
  Button,
  Avatar,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Check,
  Settings,
  Calendar,
  DollarSign,
  Target,
  MoreVertical,
  X,
} from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    type: "trade",
    title: "Trade Alert: AAPL",
    message: "Your AAPL position has reached your target profit of +15.2%",
    time: "2 minutes ago",
    read: false,
    icon: TrendingUp,
    color: "success",
    priority: "high",
  },
  {
    id: 2,
    type: "warning",
    title: "Stop Loss Triggered",
    message: "Your TSLA position was closed at -5.8% to protect your capital",
    time: "15 minutes ago",
    read: false,
    icon: TrendingDown,
    color: "error",
    priority: "high",
  },
  {
    id: 3,
    type: "alert",
    title: "Market Alert",
    message:
      "High volatility detected in tech stocks. Consider adjusting your positions",
    time: "1 hour ago",
    read: false,
    icon: AlertTriangle,
    color: "warning",
    priority: "medium",
  },
  {
    id: 4,
    type: "profit",
    title: "Weekly Performance",
    message: "Great week! You're up +23.4% this week with 8 winning trades",
    time: "3 hours ago",
    read: true,
    icon: Target,
    color: "primary",
    priority: "low",
  },
  {
    id: 5,
    type: "reminder",
    title: "Journal Reminder",
    message: "Don't forget to update your trading journal for today's sessions",
    time: "5 hours ago",
    read: true,
    icon: Calendar,
    color: "info",
    priority: "low",
  },
  {
    id: 6,
    type: "deposit",
    title: "Deposit Confirmed",
    message: "$5,000 has been successfully added to your trading account",
    time: "1 day ago",
    read: true,
    icon: DollarSign,
    color: "success",
    priority: "medium",
  },
];

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const iconButtonStyle = {
    p: 1,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      transform: "scale(1.05)",
    },
  };

  const getNotificationColor = (color, read) => {
    const colors = {
      success: read ? theme.palette.success.light : theme.palette.success.main,
      error: read ? theme.palette.error.light : theme.palette.error.main,
      warning: read ? theme.palette.warning.light : theme.palette.warning.main,
      primary: read ? theme.palette.primary.light : theme.palette.primary.main,
      info: read ? theme.palette.info.light : theme.palette.info.main,
    };
    return colors[color] || theme.palette.grey[500];
  };

  const NotificationItem = ({ notification }) => {
    const IconComponent = notification.icon;

    return (
      <Box
        sx={{
          px: 2,
          py: 1.5,
          mx: 1,
          mb: 1,
          borderRadius: "12px",
          backgroundColor: notification.read
            ? "transparent"
            : theme.palette.grey[50],
          border: notification.read
            ? "none"
            : `1px solid ${theme.palette.grey[200]}`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.grey[100],
            transform: "translateX(4px)",
          },
          cursor: "pointer",
        }}
        onClick={() => !notification.read && handleMarkAsRead(notification.id)}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: `${getNotificationColor(
                notification.color,
                notification.read
              )}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              mt: 0.5,
            }}
          >
            <IconComponent
              size={18}
              color={getNotificationColor(
                notification.color,
                notification.read
              )}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: notification.read ? 500 : 600,
                  color: notification.read
                    ? theme.palette.text.secondary
                    : theme.palette.text.primary,
                  flex: 1,
                }}
              >
                {notification.title}
              </Typography>
              {!notification.read && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: theme.palette.primary.main,
                    ml: 1,
                  }}
                />
              )}
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 1,
                fontSize: "0.875rem",
                lineHeight: 1.4,
              }}
            >
              {notification.message}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.disabled,
                  fontSize: "0.75rem",
                }}
              >
                {notification.time}
              </Typography>

              <IconButton
                size="small"
                sx={{ opacity: 0.7, "&:hover": { opacity: 1 } }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotification(notification.id);
                }}
              >
                <X size={14} />
              </IconButton>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={iconButtonStyle}>
        <Badge
          badgeContent={unreadCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "0.7rem",
              height: 18,
              minWidth: 18,
              fontWeight: 600,
            },
          }}
        >
          <Bell size={20} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        PaperProps={{
          elevation: 8,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.1))",
            mt: 1.5,
            minWidth: 400,
            maxWidth: 420,
            maxHeight: 600,
            borderRadius: "16px",
            border: `1px solid ${theme.palette.grey[200]}`,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
              border: `1px solid ${theme.palette.grey[200]}`,
              borderBottom: "none",
              borderRight: "none",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.primary.main}10)`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Bell size={20} style={{ marginRight: 8 }} />
              Notifications
            </Typography>

            <IconButton size="small" onClick={handleMenuClose}>
              <X size={16} />
            </IconButton>
          </Box>

          {unreadCount > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Chip
                label={`${unreadCount} new notification${
                  unreadCount > 1 ? "s" : ""
                }`}
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  height: 24,
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  fontWeight: 600,
                }}
              />

              <Button
                size="small"
                onClick={handleMarkAllAsRead}
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "none",
                  color: theme.palette.primary.main,
                  p: 0.5,
                }}
                startIcon={<Check size={14} />}
              >
                Mark all read
              </Button>
            </Box>
          )}
        </Box>

        {/* Notifications List */}
        <Box
          sx={{
            maxHeight: 400,
            overflowY: "auto",
            py: 1,
          }}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
                color: theme.palette.text.secondary,
              }}
            >
              <Bell size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <Typography variant="body2">No notifications yet</Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <Divider />
            <MenuItem
              sx={{
                py: 1.5,
                justifyContent: "center",
                color: theme.palette.primary.main,
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + "20",
                },
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <Settings size={18} color={theme.palette.primary.main} />
              </ListItemIcon>
              Notification Settings
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
