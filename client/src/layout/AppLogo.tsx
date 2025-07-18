import { Box, Typography, useTheme, alpha } from "@mui/material";

const AppLogo = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        px: 2,
        py: 3,
        mb: 2,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${alpha(
            theme.palette.primary.main,
            0.3
          )} 50%, transparent 100%)`,
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          mb: 2,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "scale(1.05) rotate(2deg)",
          },
        }}
      >
        <Box
          component="img"
          src="/2.png"
          alt="Trade Edge Logo"
          sx={{
            width: 56,
            height: 56,
            borderRadius: "16px",
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            background: `linear-gradient(135deg, ${
              theme.palette.background.paper
            } 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />

        {/* Decorative glow effect */}
        <Box
          sx={{
            position: "absolute",
            top: -4,
            left: -4,
            right: -4,
            bottom: -4,
            borderRadius: "20px",
            background: `conic-gradient(from 180deg at 50% 50%, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 0deg, ${alpha(theme.palette.primary.light, 0.2)} 180deg, ${alpha(
              theme.palette.primary.main,
              0.1
            )} 360deg)`,
            zIndex: -1,
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
            "&:hover": {
              opacity: 1,
            },
          }}
        />
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          fontSize: "1.4rem",
          letterSpacing: "-0.02em",
          mb: 0.5,
          background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textAlign: "center",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
            textShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          },
        }}
      >
        Trade
        <span
          style={{
            color: theme.palette.primary.main,
            fontWeight: 800,
          }}
        >
          -Edge
        </span>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            left: -16,
            top: "50%",
            transform: "translateY(-50%)",
            width: "8px",
            height: "1px",
            background: alpha(theme.palette.primary.main, 0.4),
          },
          "&::after": {
            content: '""',
            position: "absolute",
            right: -16,
            top: "50%",
            transform: "translateY(-50%)",
            width: "8px",
            height: "1px",
            background: alpha(theme.palette.primary.main, 0.4),
          },
        }}
      >
        Trading Journal
      </Typography>
    </Box>
  );
};

export default AppLogo;
