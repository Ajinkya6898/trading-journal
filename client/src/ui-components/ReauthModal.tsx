// components/ReauthModal.tsx
import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useAuthStore } from "../store/useAuthStore"; // adjust to your setup
import axios from "axios";

const ReauthModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { user, logout, setToken } = useAuthStore(); // get email, and auth functions
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleReauth = async () => {
    try {
      const res = await axios.post("/api/auth/login", {
        email: user.email,
        password,
      });
      setToken(res.data.token);
      onClose();
    } catch (err) {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleTimeout = () => {
    logout();
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: "20vh",
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Session Expired
        </Typography>
        <Typography variant="body2">
          Please re-enter your password to continue.
        </Typography>

        <TextField
          label="Email"
          value={user.email}
          fullWidth
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          error={!!error}
          helperText={error}
        />

        <Button variant="contained" onClick={handleReauth}>
          Continue
        </Button>
        <Button variant="text" color="error" onClick={handleTimeout}>
          Logout
        </Button>
      </Box>
    </Modal>
  );
};

export default ReauthModal;
