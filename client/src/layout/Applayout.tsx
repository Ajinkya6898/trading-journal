import { Box, Grid } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";

const AppLayout = () => {
  return (
    <>
      <Grid container>
        <Grid size={2}>
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
            <Box px={4} pb={4} display="flex" flexDirection="column" gap={3}>
              <Outlet />
            </Box>
          </main>
        </Grid>
      </Grid>
      <AppFooter />
    </>
  );
};

export default AppLayout;
