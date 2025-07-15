import { Box, Typography, Chip } from "@mui/material";
import { ReactNode } from "react";
import BackgroundContainer from "./BackgroundContainer";

type StatCardProps = {
  title: string;
  value: string | number;
  chipLabel?: string;
  icon: ReactNode;
  color?: string;
};

const StatCard = ({
  title,
  value,
  chipLabel,
  icon,
  color = "#3b82f6",
}: StatCardProps) => {
  function darkenColor(hex: string, amount = 0.2): string {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    r = Math.max(0, Math.floor(r * (1 - amount)));
    g = Math.max(0, Math.floor(g * (1 - amount)));
    b = Math.max(0, Math.floor(b * (1 - amount)));

    return `rgb(${r}, ${g}, ${b})`;
  }
  const iconColor = darkenColor(color, 0.2);
  return (
    <BackgroundContainer
      padding="24px"
      extraStyles={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "120px",
      }}
    >
      <Box>
        <Typography variant="body1" color="text.secondary" fontWeight={500}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          mt={1}
          mb={chipLabel ? 1 : 0}
        >
          {value}
        </Typography>
        {chipLabel && (
          <Chip
            label={chipLabel}
            size="small"
            sx={{
              backgroundColor: `${color}20`,
              color: color,
              fontWeight: 600,
              borderRadius: "12px",
              mt: 1,
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          backgroundColor: `${color}1A`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
        }}
      >
        {icon}
      </Box>
    </BackgroundContainer>
  );
};

export default StatCard;
