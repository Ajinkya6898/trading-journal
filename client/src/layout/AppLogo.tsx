import { Box, Typography } from "@mui/material";

const AppLogo = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      px={2}
      py={3}
      mb={2}
    >
      <Box
        component="img"
        src="/2.png"
        alt="Trade Edge Logo"
        sx={{
          width: 50,
          height: 50,
          mb: 1,
          borderRadius: "10px",
        }}
      />
      <Typography variant="h5">
        Trade<span style={{ color: "#3f51b5" }}>-Edge</span>
      </Typography>
      <Typography variant="body2">Trading Journal</Typography>
    </Box>
  );
};

export default AppLogo;
