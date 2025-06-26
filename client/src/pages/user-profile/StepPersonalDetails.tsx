import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Panel from "../../ui-components/Panel";
import { DatePicker } from "../../ui-components/Datepicker";
import FieldLayout from "../../ui-components/FieldLayout";
import { useModal } from "../../ui-components/ModalProvider";

const genders = ["Male", "Female", "Other"];
const countries = ["India", "USA", "UK", "Australia", "Other"];

type Props = {
  onNext: () => void;
};

const StepPersonalDetails = ({ onNext }: Props) => {
  const [form, setForm] = useState({
    fullName: "",
    dob: new Date(),
    gender: "",
    country: "",
    experience: "",
    profession: "",
  });

  const { modalDispatch } = useModal();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const missingFields: string[] = [];

    if (!form.fullName) missingFields.push("Full Name");
    if (!form.dob) missingFields.push("Date of Birth");
    if (!form.country) missingFields.push("Country");

    if (missingFields.length > 0) {
      modalDispatch({
        type: "warning",
        message: (
          <div style={{ textAlign: "left" }}>
            <Typography variant="body1">
              Cannot proceed — the following required fields are missing:
            </Typography>
            <ul style={{ margin: 0, marginTop: "16px" }}>
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

    console.log("Form submitted:", form);
    onNext();
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      dob: new Date(),
      gender: "",
      country: "",
      experience: "",
      profession: "",
    });
  };

  return (
    <Panel label="Basic Information" elementId="basic-info" forceOpen={true}>
      <Box mt={2}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>
            Tell us about yourself
          </Typography>

          <FieldLayout label="Full Name" labelSize={4} inputSize={4}>
            <TextField
              placeholder="Enter Full Name"
              fullWidth
              required
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </FieldLayout>
          <FieldLayout labelSize={4}></FieldLayout>
          <DatePicker
            label="Date of Birth"
            value={form.dob}
            variant="small"
            onChange={(newValue) => handleChange("dob", newValue)}
            labelSize={4}
          />

          <FieldLayout label="Gender" labelSize={4} inputSize={3}>
            <TextField
              select
              fullWidth
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
          </FieldLayout>

          <FieldLayout label="Country" labelSize={4} inputSize={4}>
            <TextField
              select
              required
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

          <FieldLayout label="Profession" labelSize={4} inputSize={4}>
            <TextField
              placeholder="Enter Profession"
              fullWidth
              value={form.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
            />
          </FieldLayout>

          <FieldLayout labelSize={4} inputSize={4}>
            <Stack direction="row" spacing={2}>
              <Button size="large" variant="contained" onClick={handleSubmit}>
                Save & Continue
              </Button>
              <Button
                size="large"
                variant="outlined"
                color="error"
                onClick={() =>
                  modalDispatch({
                    type: "warning",
                    message: "Are you sure you want to reset this form?",
                    onConfirm: () => handleReset(),
                  })
                }
              >
                Reset
              </Button>
            </Stack>
          </FieldLayout>
        </Stack>
      </Box>
    </Panel>
  );
};

export default StepPersonalDetails;
