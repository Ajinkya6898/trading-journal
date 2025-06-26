import {
  Button,
  Stack,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import Panel from "../../ui-components/Panel";
import FieldLayout from "../../ui-components/FieldLayout";
import { useNavigate } from "react-router-dom";

type Props = {
  onBack: () => void;
};

const StepPreferences = ({ onBack }: Props) => {
  const [form, setForm] = useState({
    receiveTips: true,
    darkMode: false,
    emailUpdates: true,
  });
  const navigate = useNavigate();

  const handleChange = (field: string, value: boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Preferences Submitted:", form);
    navigate("/dashboard");
  };

  return (
    <Panel label="Preferences" elementId="preferences-info" forceOpen={true}>
      <Box mt={2}>
        <Stack spacing={3}>
          <Typography variant="h6" fontWeight={600}>
            Your Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose how you'd like to personalize your experience.
          </Typography>

          <FieldLayout>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.receiveTips}
                  onChange={(e) =>
                    handleChange("receiveTips", e.target.checked)
                  }
                />
              }
              label="Receive daily trading tips & insights"
            />
          </FieldLayout>

          <FieldLayout>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.darkMode}
                  onChange={(e) => handleChange("darkMode", e.target.checked)}
                />
              }
              label="Enable dark mode theme"
            />
          </FieldLayout>

          <FieldLayout>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.emailUpdates}
                  onChange={(e) =>
                    handleChange("emailUpdates", e.target.checked)
                  }
                />
              }
              label="Get email updates about new features"
            />
          </FieldLayout>

          <FieldLayout>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={onBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Finish Setup
              </Button>
            </Stack>
          </FieldLayout>
        </Stack>
      </Box>
    </Panel>
  );
};

export default StepPreferences;
