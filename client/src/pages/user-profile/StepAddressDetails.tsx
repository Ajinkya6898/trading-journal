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

const countries = ["India", "USA", "UK", "Australia", "Other"];

type Props = {
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
};

const StepAddressDetails = ({ onNext, onBack, onSkip }: Props) => {
  const [form, setForm] = useState({
    addressLine: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { modalDispatch } = useModal();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const missingFields: string[] = [];

    if (!form.addressLine) missingFields.push("Address Line");
    if (!form.city) missingFields.push("City");
    if (!form.state) missingFields.push("State");
    if (!form.zip) missingFields.push("ZIP/Postal Code");
    if (!form.country) missingFields.push("Country");

    if (missingFields.length > 0) {
      modalDispatch({
        type: "warning",
        message: (
          <div style={{ textAlign: "left" }}>
            <Typography variant="body1">
              Please complete all required fields:
            </Typography>
            <ul style={{ margin: 0, marginTop: "16px", paddingLeft: "20px" }}>
              {missingFields.map((field) => (
                <li key={field}>
                  <Typography variant="body1" component="span">
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

    console.log("Address form submitted:", form);
    onNext();
  };

  return (
    <Panel label="Address Details" elementId="address-info" forceOpen={true}>
      <Box mt={2}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight={600}>
            Where do you live?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Optional — you can update this later in your profile.
          </Typography>

          <FieldLayout label="Address Line" labelSize={4} inputSize={6}>
            <TextField
              placeholder="Enter Address Line"
              fullWidth
              value={form.addressLine}
              onChange={(e) => handleChange("addressLine", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout label="City" labelSize={4} inputSize={4}>
            <TextField
              placeholder="Enter City"
              fullWidth
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout label="State" labelSize={4} inputSize={4}>
            <TextField
              placeholder="Enter State"
              fullWidth
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout label="ZIP / Postal Code" labelSize={4} inputSize={3}>
            <TextField
              placeholder="Enter ZIP Code"
              fullWidth
              value={form.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout label="Country" labelSize={4} inputSize={4}>
            <TextField
              select
              fullWidth
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
            >
              {countries.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout labelSize={4} inputSize={8}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" size="large" onClick={onBack}>
                Back
              </Button>
              <Button variant="contained" size="large" onClick={handleSubmit}>
                Save & Continue
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="secondary"
                onClick={onSkip}
              >
                Skip for now
              </Button>
            </Stack>
          </FieldLayout>
        </Stack>
      </Box>
    </Panel>
  );
};

export default StepAddressDetails;
