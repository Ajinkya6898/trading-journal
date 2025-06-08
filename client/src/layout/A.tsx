import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
  Typography,
  Switch,
  Box,
} from "@mui/material";
import {
  Settings,
  Logout,
  HelpOutline,
  Brightness4,
  AccessibilityNew,
  Tune,
} from "@mui/icons-material";

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [darkMode, setDarkMode] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
        <Avatar
          src="/avatar.png"
          alt="profile"
          sx={{ width: 32, height: 32, border: "2px solid white" }}
        />
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
          <Typography variant="subtitle1">Guest</Typography>
          <Typography variant="body2" color="orange">
            Merchant Captain 🧡
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AccessibilityNew fontSize="small" />
          </ListItemIcon>
          Accessibility
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Tune fontSize="small" />
          </ListItemIcon>
          Preferences
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Brightness4 fontSize="small" />
          </ListItemIcon>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            Dark mode
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              size="small"
            />
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Account Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <HelpOutline fontSize="small" />
          </ListItemIcon>
          Help Center
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign In
        </MenuItem>
      </Menu>
    </Box>
  );
}
