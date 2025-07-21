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
import Icon from "../../ui-components/Icon";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useModal } from "../../ui-components/ModalProvider";
import Loader from "../../ui-components/Loader";

export default function SignUpForm() {
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register, loading } = useAuthStore();
  const { modalDispatch } = useModal();
  const navigate = useNavigate();

  const handleFormChange = (e: any) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(newUserData.email, newUserData.password);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
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
        component="form"
        onSubmit={handleSubmit}
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
                  Create an account
                </Typography>
                <Typography mt={1} variant="body2" color="text.secondary">
                  Join <b>Trade-Edge</b> to start your journey
                </Typography>
              </Box>

              <Box>
                <Typography mb={1} variant="body1">
                  Full Name
                </Typography>
                <TextField
                  type="text"
                  name="name"
                  value={newUserData.name}
                  onChange={handleFormChange}
                  placeholder="Your full name"
                  fullWidth
                  required
                />
              </Box>

              <Box>
                <Typography mb={1} variant="body1">
                  Email
                </Typography>
                <TextField
                  type="email"
                  name="email"
                  value={newUserData.email}
                  onChange={handleFormChange}
                  placeholder="m@example.com"
                  fullWidth
                  required
                />
              </Box>

              <Box>
                <Typography mb={1} variant="body1">
                  Password
                </Typography>
                <TextField
                  type="password"
                  name="password"
                  value={newUserData.password}
                  onChange={handleFormChange}
                  placeholder="Create a password"
                  fullWidth
                  required
                />
              </Box>

              <Button variant="contained" type="submit" size="large" fullWidth>
                Sign Up
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
                Already have an account?{" "}
                <Link
                  onClick={() => navigate("/login")}
                  sx={{ cursor: "pointer" }}
                  underline="hover"
                >
                  Log in
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
              By signing up, you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>.
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
}
