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

export default function SignUpForm() {
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
                placeholder="Create a password"
                fullWidth
                required
              />
            </Box>

            <Button variant="contained" size="large" fullWidth>
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
  );
}
