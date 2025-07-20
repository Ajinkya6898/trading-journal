import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Paper,
  Container,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import { Lightbulb, Bell } from "lucide-react";
import UserMenu from "./UserMenu";
import { NavLink } from "react-router-dom";
import NotificationsMenu from "./NotificationsMenu";

const AppHeader = () => {
  const theme = useTheme();
  const loggedin = localStorage.getItem("loggedIn") === "true";

  const iconButtonStyle = {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    width: 44,
    height: 44,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      transform: "translateY(-1px)",
      boxShadow: theme.shadows[2],
    },
  };

  const searchFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      backgroundColor: theme.palette.grey[50],
      border: `1px solid ${theme.palette.grey[200]}`,
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.grey[300],
        boxShadow: theme.shadows[1],
      },
      "&.Mui-focused": {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}20`,
      },
      "& fieldset": {
        border: "none",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 16px",
      fontSize: "0.95rem",
    },
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            py: 1,
            minHeight: "70px !important",
          }}
        >
          {/* Search Bar */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 480,
              mx: 4,
              display: { xs: "none", md: "block" },
            }}
          >
            <TextField
              fullWidth
              placeholder="Search trades, strategies, or notes..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      size={20}
                      style={{ color: theme.palette.grey[500] }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={searchFieldStyle}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Notification Bell */}
            <IconButton sx={iconButtonStyle}>
              <NotificationsMenu />
            </IconButton>

            {/* Tips/Lightbulb */}
            <IconButton sx={iconButtonStyle}>
              <Lightbulb size={20} />
            </IconButton>

            {/* Login/User Menu */}
            {loggedin ? (
              <Box sx={{ ml: 1 }}>
                <UserMenu />
              </Box>
            ) : (
              <Button
                variant="contained"
                component={NavLink}
                to="/login"
                sx={{
                  borderRadius: "20px",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  boxShadow: theme.shadows[2],
                  "&:hover": {
                    transform: "translateY(-1px)",
                    boxShadow: theme.shadows[4],
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Search Bar */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          px: 2,
          pb: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  size={20}
                  style={{ color: theme.palette.grey[500] }}
                />
              </InputAdornment>
            ),
          }}
          sx={searchFieldStyle}
        />
      </Box>
    </AppBar>
  );
};

export default AppHeader;
