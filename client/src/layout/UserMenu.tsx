import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import { User, LogOut, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const userInfo = JSON.parse(localStorage.getItem("userInformation") || "{}");
  const fullName = userInfo?.fullName || "Guest";
  const initial = fullName ? fullName.charAt(0).toUpperCase() : "T";

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
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
    logout();
    navigate("/login");
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
        <Avatar sx={{ width: 36, height: 36, border: "2px solid white" }}>
          {initial}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 230,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 16,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box px={2} py={1}>
          <Typography
            variant="body1"
            color="primary"
            fontStyle="italic"
            display="flex"
            alignItems="center"
            gap={1}
            my={1}
          >
            <Heart size={14} style={{ color: "crimson" }} />
            Trading. Journaling. Winning.
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <User size={18} />
          </ListItemIcon>
          My Profile
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={18} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
