import {
  Box,
  Typography,
  Stack,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
  subtitle?: string;
}

const PageHeader = ({ title, actions, subtitle }: PageHeaderProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(135deg, ${
          theme.palette.background.paper
        } 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
        borderRadius: "16px",
        border: `1px solid ${alpha(theme.palette.grey[300], 0.15)}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        mb: 3,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.08)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
          opacity: 0.7,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${alpha(
            theme.palette.primary.main,
            0.03
          )} 0%, transparent 50%)`,
          pointerEvents: "none",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          position: "relative",
          zIndex: 1,
          px: 3,
          py: 2.5,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: "1.75rem",
              color: theme.palette.text.primary,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              background: `linear-gradient(135deg, ${
                theme.palette.text.primary
              } 0%, ${alpha(theme.palette.primary.main, 0.8)} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: subtitle ? 0.5 : 0,
              transition: "all 0.2s ease-in-out",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.875rem",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                opacity: 0.8,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actions && (
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{
              "& > *": {
                transition: "all 0.2s ease-in-out",
              },
              "& > *:hover": {
                transform: "translateY(-1px)",
              },
            }}
          >
            {actions}
          </Stack>
        )}
      </Box>

      <Divider
        sx={{
          mx: 3,
          background: `linear-gradient(90deg, 
            transparent 0%, 
            ${alpha(theme.palette.primary.main, 0.15)} 20%, 
            ${alpha(theme.palette.primary.main, 0.25)} 50%, 
            ${alpha(theme.palette.primary.main, 0.15)} 80%, 
            transparent 100%
          )`,
          height: "1px",
          border: "none",
          opacity: 0.6,
        }}
      />
    </Box>
  );
};

export default PageHeader;
