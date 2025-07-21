import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const res = await fetch("/api/newsletter/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (res.ok) {
      setStatus("Subscribed successfully!");
      setEmail("");
    } else {
      setStatus(data.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Your email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained">
        Subscribe
      </Button>
      {status && <Typography sx={{ mt: 1 }}>{status}</Typography>}
    </form>
  );
};
