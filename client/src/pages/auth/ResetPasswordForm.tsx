import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleReset = () => {
    if (!password || !confirmPassword) {
      setError("Both fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // TODO: send password update request to backend
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "gray.light",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                Reset Password
              </Typography>
              <Typography mt={1} variant="body2" color="text.secondary">
                Enter your new password below.
              </Typography>
            </Box>

            <Box>
              <Typography variant="body1" mb={1}>
                New Password
              </Typography>
              <TextField
                type="password"
                placeholder="Enter new password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>

            <Box>
              <Typography variant="body1" mb={1}>
                Confirm Password
              </Typography>
              <TextField
                type="password"
                placeholder="Re-enter new password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!error}
                helperText={error}
              />
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleReset}
            >
              Reset Password
            </Button>

            <Typography variant="body2" textAlign="center">
              Remembered it?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Go to Login
              </span>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
