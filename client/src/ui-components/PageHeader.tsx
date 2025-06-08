import { Box, Typography, Stack, Divider } from "@mui/material";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  actions?: ReactNode;
}

const PageHeader = ({ title, actions }: PageHeaderProps) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>

        {actions && (
          <Stack direction="row" spacing={1} alignItems="center">
            {actions}
          </Stack>
        )}
      </Box>
      <Divider sx={{ mt: 2.5 }} />
    </>
  );
};

export default PageHeader;
