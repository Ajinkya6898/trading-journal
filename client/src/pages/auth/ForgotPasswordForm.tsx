import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

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
                Forgot Password?
              </Typography>
              <Typography mt={1} variant="body2" color="text.secondary">
                Enter your registered email address and we'll send you reset
                instructions.
              </Typography>
            </Box>

            <Box>
              <Typography mb={1} variant="body1">
                Email
              </Typography>
              <TextField
                type="email"
                placeholder="m@example.com"
                fullWidth
                required
              />
            </Box>

            <Button variant="contained" size="large" fullWidth>
              Send Reset Link
            </Button>

            <Divider>
              <Typography variant="caption" color="text.secondary">
                Need help?
              </Typography>
            </Divider>

            <Typography variant="body2" textAlign="center">
              Remember your password?{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
                underline="hover"
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </CardContent>

        <Box px={3} pb={3}>
          <Typography
            variant="caption"
            color="text.secondary"
            textAlign="center"
            display="block"
          >
            If you don't receive an email within a few minutes, please check
            your spam folder or{" "}
            <Link href="#" underline="hover">
              contact support
            </Link>
            .
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
