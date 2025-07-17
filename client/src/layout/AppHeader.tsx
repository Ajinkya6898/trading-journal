import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { SearchIcon } from "lucide-react";
import { Lightbulb, Bell } from "lucide-react";
import UserMenu from "./UserMenu";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  const theme = useTheme();
  const loggedin = localStorage.getItem("loggedIn") === "true";

  const bgIconStyle = {
    background: theme.palette.gray.lighter,
    padding: "6px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: 0.7,
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      px={4}
      py={2}
      borderBottom={"1px solid "}
      borderColor={theme.palette.gray.medium}
    >
      <Box width={400}>
        <TextField
          placeholder="Search"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ width: "16px" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              backgroundColor: theme.palette.gray.lighter,
              "& fieldset": {
                borderColor: theme.palette.gray.light,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.gray.medium,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.primary.main,
              },
            },
          }}
        />
      </Box>
      <Box display="flex" alignContent="center" alignItems="center">
        <Box sx={bgIconStyle}>
          <Lightbulb
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            strokeWidth={0.8}
          />
        </Box>
        <Box sx={bgIconStyle}>
          <Bell
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            strokeWidth={0.8}
          />
        </Box>
        {loggedin ? (
          <UserMenu />
        ) : (
          <Button
            variant="contained"
            component={NavLink}
            to="/login"
            sx={{
              borderRadius: "5px",
              paddingX: 2,
              mx: 2,
            }}
          >
            Log In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AppHeader;
