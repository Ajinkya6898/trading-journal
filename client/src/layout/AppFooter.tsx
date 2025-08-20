import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  useTheme,
  Container,
  Paper,
} from "@mui/material";
import {
  Mail,
  Heart,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Send,
} from "lucide-react";
import axiosInstance from "../store/axiosInstance";

const AppFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const handleNewsletterSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email) return;

    try {
      setIsLoading(true);

      const res = await axiosInstance.post("/newsletter/subscribe", {
        email,
      });

      if (res.status === 201) {
        setIsSubscribed(true);
        setEmail("");

        setTimeout(() => setIsSubscribed(false), 3000);
      }
    } catch (error: any) {
      console.error("Newsletter subscription failed:", error);
      if (error.response?.status === 409) {
        setErrorMsg("You're already subscribed.");
      } else if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const socialIcons = [
    { Icon: Twitter, label: "Twitter", color: "#1DA1F2" },
    { Icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
    { Icon: Instagram, label: "Instagram", color: "#E4405F" },
    { Icon: Github, label: "GitHub", color: "#333" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.lightest} 0%, ${theme.palette.gray.lightest} 100%)`,
        position: "relative",
        overflow: "hidden",
        pt: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}40, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box textAlign="center" sx={{ py: { xs: 2, md: 2 } }}>
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid>
              <Box sx={{ pr: { lg: 4 } }}>
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Trade-Edge
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.gray.dark,
                    mb: 3,
                    lineHeight: 1.6,
                    fontSize: "1.1rem",
                  }}
                >
                  Creating exceptional digital experiences for modern brands. We
                  help businesses grow through innovative design and technology
                  solutions.
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {socialIcons.map(({ Icon, label, color }) => (
                    <IconButton
                      key={label}
                      aria-label={label}
                      sx={{
                        width: 48,
                        height: 48,
                        textAlign: "center",
                        backgroundColor: theme.palette.background.paper,
                        border: `2px solid ${theme.palette.gray.light}`,
                        color: theme.palette.gray.dark,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          backgroundColor: color,
                          borderColor: color,
                          color: "white",
                          transform: "translateY(-4px)",
                          boxShadow: `0 8px 25px ${color}30`,
                        },
                      }}
                    >
                      <Icon size={20} />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: theme.palette.gray.light, opacity: 0.7 }} />
        <Box sx={{ py: 2 }}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 3,
              border: `1px solid ${theme.palette.gray.light}`,
              p: { xs: 4, md: 6 },
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.lighter,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                }}
              >
                <Mail size={24} style={{ color: theme.palette.primary.main }} />
              </Box>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                }}
              >
                Stay in the loop
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: theme.palette.gray.dark,
                mb: 4,
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Get the latest updates, insights, and exclusive content delivered
              straight to your inbox.
            </Typography>

            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                maxWidth: 500,
                mx: "auto",
                mb: isSubscribed ? 2 : 0,
              }}
            >
              <TextField
                variant="outlined"
                type="email"
                autoComplete="off"
                placeholder="Enter your email address"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.gray.lighter,
                    borderRadius: 2,
                    "& fieldset": {
                      borderColor: theme.palette.gray.light,
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.light,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubscribed || isLoading}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  whiteSpace: "nowrap",
                  borderRadius: 2,
                  minWidth: 140,
                  boxShadow: `0 4px 15px ${theme.palette.primary.main}30`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                    transform: "translateY(-2px)",
                    boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
                  },
                  "&:disabled": {
                    background: theme.palette.success.main,
                    color: "white",
                  },
                }}
                startIcon={
                  isSubscribed || isLoading ? null : <Send size={18} />
                }
              >
                {isSubscribed
                  ? "Subscribed! ✓"
                  : isLoading
                  ? "Subscribing..."
                  : "Subscribe"}
              </Button>
            </Box>

            {errorMsg && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.error.main,
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                {errorMsg}
              </Typography>
            )}

            {isSubscribed && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.success.main,
                  fontWeight: 600,
                  animation: "pulse 2s ease-in-out infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.7 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.7 },
                  },
                }}
              >
                Thank you for subscribing! You'll hear from us soon.
              </Typography>
            )}
          </Paper>
        </Box>

        {/* Footer Bottom */}
        <Divider sx={{ borderColor: theme.palette.gray.light, opacity: 0.7 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.gray.dark,
              fontSize: "0.9rem",
            }}
          >
            © 2025 Trade-Edge. All rights reserved.
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <Typography
                key={item}
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.gray.dark,
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item}
              </Typography>
            ))}
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Made with{" "}
              <Heart size={16} color="red" style={{ marginBottom: -2 }} />
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AppFooter;
