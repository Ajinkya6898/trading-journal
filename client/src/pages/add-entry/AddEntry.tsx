import { Box, Button, Stack } from "@mui/material";
import PageHeader from "../../ui-components/PageHeader";
import MutualFundEntryForm from "./MutualFundEntryForm";
import StockEntryForm from "./StockEntryForm";
import ETFEntryForm from "./ETFEntryForm";
import CryptoEntryForm from "./CryptoEntryForm";

const AddEntry = () => {
  return (
    <>
      <PageHeader
        title="Add New Entry"
        actions={
          <>
            <Stack display="flex" flexDirection="row" gap={2}>
              <Button variant="outlined" color="gray">
                Expand All
              </Button>
              <Button variant="outlined" color="gray">
                Collapse All
              </Button>
            </Stack>
          </>
        }
      />
      <Box mt={4}>
        <StockEntryForm />
        <MutualFundEntryForm />
        <ETFEntryForm />
        <CryptoEntryForm />
      </Box>
    </>
  );
};

export default AddEntry;
