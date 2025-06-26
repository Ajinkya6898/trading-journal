import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";

// Step Components (create these separately)
import StepPersonalDetails from "./StepPersonalDetails";
import StepAddressDetails from "./StepAddressDetails";
import StepTradingInfo from "./StepTradingInfo";
import StepPreferences from "./StepPreferences";

const steps = ["Personal Info", "Address", "Trading Info", "Preferences"];

const ProfileProgress = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <StepPersonalDetails onNext={handleNext} />;
      case 1:
        return <StepAddressDetails onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <StepTradingInfo onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepPreferences onBack={handleBack} />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Complete Your Profile
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={4}>{renderStepContent(activeStep)}</Box>
    </Box>
  );
};

export default ProfileProgress;
