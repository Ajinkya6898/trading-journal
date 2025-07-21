import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(1%)",
        zIndex: 50,
      }}
    >
      <div className="loader"></div>
    </Box>
  );
};

export default Loader;
