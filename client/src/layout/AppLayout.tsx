import { Box, Grid, useTheme } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const AppLayout = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container>
        <Grid borderRight={`1px solid ${theme.palette.gray.medium}`} size={2}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
            }}
          >
            <Sidebar />
          </div>
        </Grid>
        <Grid size={10}>
          <main
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <AppHeader />
            <Box px={4} display="flex" flexDirection="column" gap={3}>
              <Outlet />
            </Box>
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default AppLayout;
