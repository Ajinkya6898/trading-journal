import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

export default function VerifyEmailOtpForm() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      // TODO: verify code
      navigate("/reset-password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "gray.light",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h5" fontWeight="bold">
                Verify OTP
              </Typography>
              <Typography mt={1} variant="body2" color="text.secondary">
                Enter the 6-digit code sent to your email.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" gap={1}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric",
                    style: {
                      textAlign: "center",
                      fontSize: "1.2rem",
                      padding: 0,
                      width: "3rem",
                      height: "3rem",
                    },
                  }}
                  sx={{
                    "& input": {
                      borderRadius: "8px",
                      backgroundColor: "white",
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleVerify}
              disabled={otp.some((digit) => digit === "")}
            >
              Verify
            </Button>

            <Typography variant="body2" textAlign="center">
              Didn&apos;t receive the code?{" "}
              <Link href="#" underline="hover">
                Resend OTP
              </Link>
            </Typography>

            <Typography variant="body2" textAlign="center">
              Go back to{" "}
              <Link
                onClick={() => navigate("/login")}
                sx={{ cursor: "pointer" }}
                underline="hover"
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
