import {
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { useModal } from "../../ui-components/ModalProvider";

const strategies = ["Swing", "Intraday", "Positional", "Options", "Scalping"];
const platforms = ["Zerodha", "Upstox", "ICICI", "Groww", "Others"];

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const StepTradingInfo = ({ onNext, onBack }: Props) => {
  const [form, setForm] = useState({
    yearsTrading: "",
    tradingStyle: "",
    primaryPlatform: "",
  });

  const { modalDispatch } = useModal();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const missingFields: string[] = [];
    if (!form.yearsTrading) missingFields.push("Years of Experience");
    if (!form.tradingStyle) missingFields.push("Trading Style");
    if (!form.primaryPlatform) missingFields.push("Primary Platform");

    if (missingFields.length > 0) {
      modalDispatch({
        type: "warning",
        message: (
          <div style={{ textAlign: "left" }}>
            <Typography variant="body1">
              Please complete all required fields:
            </Typography>
            <ul style={{ marginTop: "16px", paddingLeft: "20px" }}>
              {missingFields.map((field) => (
                <li key={field}>
                  <Typography>{field}</Typography>
                </li>
              ))}
            </ul>
          </div>
        ),
      });
      return;
    }

    console.log("Trading Info Submitted:", form);
    onNext();
  };

  return (
    <Panel label="Trading Info" elementId="trading-info" forceOpen={true}>
      <Box mt={2}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>
            Your Trading Profile
          </Typography>

          <FieldLayout label="Years of Experience">
            <TextField
              type="number"
              placeholder="e.g. 3"
              fullWidth
              value={form.yearsTrading}
              onChange={(e) => handleChange("yearsTrading", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout label="Trading Style">
            <TextField
              select
              fullWidth
              value={form.tradingStyle}
              onChange={(e) => handleChange("tradingStyle", e.target.value)}
            >
              {strategies.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout label="Primary Broker / Platform">
            <TextField
              select
              fullWidth
              value={form.primaryPlatform}
              onChange={(e) => handleChange("primaryPlatform", e.target.value)}
            >
              {platforms.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Save & Continue
              </Button>
            </Stack>
          </FieldLayout>
        </Stack>
      </Box>
    </Panel>
  );
};

export default StepTradingInfo;
