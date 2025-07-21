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
import { useAuthStore } from "../../store/useAuthStore";

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
    phone: "",
  });

  const updateProfile = useAuthStore((state) => state.updateProfile);
  const { modalDispatch } = useModal();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const missingFields: string[] = [];

    if (!form.fullName) missingFields.push("Full Name");
    if (!form.dob) missingFields.push("Date of Birth");
    if (!form.country) missingFields.push("Country");
    if (!form.phone) missingFields.push("Phone");

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

    try {
      await updateProfile(form);
      modalDispatch({
        type: "success",
        message: "Profile updated successfully",
      });
      onNext();
    } catch (error: any) {
      modalDispatch({
        type: "error",
        message: error.message || "Failed to update profile",
      });
    }
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setForm({
      fullName: "",
      dob: new Date(),
      gender: "",
      country: "",
      experience: "",
      profession: "",
      phone: "",
    });
  };

  return (
    <Panel label="Basic Information" elementId="basic-info" forceOpen={true}>
      <Box mt={2}>
        <Stack spacing={2}>
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

          <DatePicker
            label="Date of Birth"
            value={form.dob}
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

          <FieldLayout label="Phone" labelSize={4} inputSize={4}>
            <TextField
              placeholder="Enter phone number"
              fullWidth
              required
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
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
