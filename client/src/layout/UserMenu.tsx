import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Typography,
  Box,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { User, LogOut, Heart, Settings, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useModal } from "../ui-components/ModalProvider";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();
  const { logout } = useAuthStore();
  const { modalDispatch } = useModal();

  const userInfo = JSON.parse(localStorage.getItem("userInformation") || "{}");
  const fullName = userInfo?.fullName || "Guest";
  const initial = fullName ? fullName.charAt(0).toUpperCase() : "T";

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate("/my-profile");
  };

  const handleLogout = () => {
    modalDispatch({
      type: "warning",
      message: "Do you really want to logout?",
      onConfirm: () => {
        logout();
        navigate("/login");
      },
    });
  };

  const avatarStyle = {
    width: 40,
    height: 40,
    fontSize: "1.1rem",
    fontWeight: 600,
    background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    border: `2px solid ${theme.palette.background.paper}`,
    boxShadow: theme.shadows[2],
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[4],
    },
  };

  const menuItemStyle = {
    py: 1.5,
    px: 2,
    minHeight: "auto",
    borderRadius: "8px",
    mx: 1,
    mb: 0.5,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      transform: "translateX(4px)",
    },
  };

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          p: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Avatar sx={avatarStyle}>{initial}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.1))",
            mt: 1.5,
            minWidth: 280,
            borderRadius: "12px",
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
        {/* User Info Header */}
        <Box
          sx={{
            px: 2,
            py: 2,
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
              mb: 0.5,
            }}
          >
            {fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
              mb: 1,
            }}
          >
            {userInfo?.email || "trader@example.com"}
          </Typography>
          {/* <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label="Pro Trader"
              size="small"
              sx={{
                fontSize: "0.7rem",
                height: 20,
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                color: "white",
                fontWeight: 600,
              }}
            />
            <Chip
              label="Trading. Journaling. Winning."
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 20,
                borderColor: theme.palette.grey[300],
                color: theme.palette.text.secondary,
              }}
            />
          </Box> */}
        </Box>

        {/* Menu Items */}
        <MenuItem onClick={handleProfileClick} sx={menuItemStyle}>
          <ListItemIcon>
            <User size={20} color={theme.palette.grey[600]} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            My Profile
          </Typography>
        </MenuItem>

        <MenuItem sx={menuItemStyle}>
          <ListItemIcon>
            <TrendingUp size={20} color={theme.palette.grey[600]} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Trading Performance
          </Typography>
        </MenuItem>

        <MenuItem sx={menuItemStyle}>
          <ListItemIcon>
            <Heart size={20} color={theme.palette.grey[600]} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Favorites
          </Typography>
        </MenuItem>

        <MenuItem sx={menuItemStyle}>
          <ListItemIcon>
            <Settings size={20} color={theme.palette.grey[600]} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Settings
          </Typography>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleLogout}
          sx={{
            ...menuItemStyle,
            color: theme.palette.error.main,
            "&:hover": {
              backgroundColor: theme.palette.error.light + "20",
              transform: "translateX(4px)",
            },
          }}
        >
          <ListItemIcon>
            <LogOut size={20} color={theme.palette.error.main} />
          </ListItemIcon>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
