import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useModal } from "../../ui-components/ModalProvider";
import Loader from "../../ui-components/Loader";
import Icon from "../../ui-components/Icon";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const { modalDispatch } = useModal();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Something went wrong I am here";
      modalDispatch({
        type: "error",
        message,
      });
    }
  };

  return (
    <>
      {loading && <Loader />}
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
        <Card
          sx={{ maxWidth: 420, width: "100%" }}
          component="form"
          onSubmit={handleSubmit}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography variant="h5" fontWeight="bold">
                  Welcome back
                </Typography>
                <Typography mt={1} variant="body2" color="text.secondary">
                  Login to your <b>Trade-Edge</b> account
                </Typography>
              </Box>

              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography mb={1} variant="body1">
                    Email
                  </Typography>
                </Box>
                <TextField
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Box>

              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1">Password</Typography>
                  <Link
                    onClick={() => navigate("/forgot-password")}
                    variant="body2"
                    underline="hover"
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{ mt: 1 }}
                />
              </Box>

              <Button variant="contained" type="submit" size="large" fullWidth>
                Login
              </Button>

              <Divider>
                <Typography variant="caption" color="text.secondary">
                  Or continue with
                </Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Icon id="login" type="google" />}
                    sx={{ height: 40, textTransform: "none" }}
                  >
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Icon id="login" type="facebook" />}
                    sx={{ height: 40, textTransform: "none" }}
                  >
                    <span className="sr-only">Login with Meta</span>
                  </Button>
                </Grid>
              </Grid>

              <Typography variant="body2" textAlign="center">
                Don&apos;t have an account?{" "}
                <Link
                  onClick={() => navigate("/signup")}
                  sx={{ cursor: "pointer" }}
                  underline="hover"
                >
                  Sign up
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
              By clicking continue, you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>.
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
