import { useEffect, useState } from "react";
import { TextField, Box, Button, Stack, MenuItem } from "@mui/material";
import { DatePicker } from "../../ui-components/Datepicker";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { useFundTransactionStore } from "../../store/useFundTransactionStore";
import { useModal } from "../../ui-components/ModalProvider";
import { Typography } from "@mui/material";
import Loader from "../../ui-components/Loader";

const accountOptions = ["Zerodha", "Dhan", "Groww", "Upstox", "Other"];
const transactionTypes = ["Add", "Withdraw"];

const FundTransactionForm = () => {
  const { modalDispatch } = useModal();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [transactionType, setTransactionType] = useState("Add");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("Groww");

  const { loading, addTransaction } = useFundTransactionStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);

    const missingFields: string[] = [];
    if (!selectedDate) missingFields.push("Transaction Date");
    if (!transactionType) missingFields.push("Transaction Type");
    if (!amount || parsedAmount <= 0) missingFields.push("Amount");
    if (!account) missingFields.push("Account");

    if (missingFields.length > 0) {
      modalDispatch({
        type: "error",
        message: (
          <div style={{ textAlign: "left" }}>
            <Typography variant="body1">
              Please fill the following required fields:
            </Typography>
            <ul style={{ margin: 0, marginTop: "16px" }}>
              {missingFields.map((field) => (
                <li key={field}>
                  <Typography variant="body2" component="span">
                    {field}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
      return;
    }

    const transactionData = {
      date: selectedDate.toISOString(),
      type: transactionType as "Add" | "Withdraw",
      amount: parsedAmount,
      account,
    };

    try {
      await addTransaction(transactionData);
      modalDispatch({
        type: "success",
        message: "Fund transaction added successfully!",
      });

      setTransactionType("Add");
      setAmount("");
      setAccount("Zerodha");
      setSelectedDate(new Date());
    } catch (err) {
      modalDispatch({
        type: "error",
        message: "Failed to add fund transaction. Please try again.",
      });
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Panel
        elementId="fund-transaction"
        label="Fund Transaction"
        forceOpen={true}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          mt={2}
          display="flex"
          flexDirection="column"
          gap={2}
          onSubmit={handleSubmit}
        >
          <DatePicker
            label="Transaction Date"
            value={selectedDate}
            labelSize={3}
            onChange={(newValue) => setSelectedDate(newValue)}
          />

          <FieldLayout label="Transaction Type" labelSize={3}>
            <TextField
              fullWidth
              select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
              variant="outlined"
            >
              {transactionTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout label="Amount" labelSize={3}>
            <TextField
              fullWidth
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              variant="outlined"
            />
          </FieldLayout>

          <FieldLayout label="Account" labelSize={3}>
            <TextField
              fullWidth
              select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              variant="outlined"
            >
              {accountOptions.map((acc) => (
                <MenuItem key={acc} value={acc}>
                  {acc}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout labelSize={3}>
            <Stack display="flex" flexDirection="row" gap={2}>
              <Button variant="contained" size="large" fullWidth type="submit">
                Submit
              </Button>
              <Button
                color="error"
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => {
                  setTransactionType("Add");
                  setAmount("");
                  setAccount("Groww");
                  setSelectedDate(new Date());
                }}
              >
                Clear Form
              </Button>
            </Stack>
          </FieldLayout>
        </Box>
      </Panel>
    </>
  );
};

export default FundTransactionForm;
