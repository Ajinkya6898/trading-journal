import React from "react";
import { Alert, AlertTitle, Collapse, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const CustomAlert = ({
  severity = "info",
  title,
  message,
  variant = "filled",
  closable = false,
  onClose,
  open = true,
  sx = {},
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const closeButton = closable ? (
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={handleClose}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  ) : null;

  return (
    <Collapse in={isOpen}>
      <Alert
        severity={severity}
        variant={variant}
        action={closeButton}
        sx={{ mb: 2, ...sx }}
        {...props}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Collapse>
  );
};

// Demo component showing different use cases
const AlertDemo = () => {
  const [showError, setShowError] = React.useState(true);
  const [showNoItems, setShowNoItems] = React.useState(true);
  const [showSuccess, setShowSuccess] = React.useState(true);
  const [showWarning, setShowWarning] = React.useState(true);

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h2>Alert Component Demo</h2>

      <CustomAlert
        severity="error"
        title="Error"
        message="Something went wrong! Please try again later."
        closable={true}
        open={showError}
        onClose={() => setShowError(false)}
      />

      {/* No Items Alert */}
      <CustomAlert
        severity="info"
        title="No Items Found"
        message="There are currently no items to display. Try adjusting your filters or adding new content."
        variant="outlined"
        closable={true}
        open={showNoItems}
        onClose={() => setShowNoItems(false)}
      />

      {/* Success Alert */}
      <CustomAlert
        severity="success"
        title="Success"
        message="Your operation completed successfully!"
        closable={true}
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      {/* Warning Alert */}
      <CustomAlert
        severity="warning"
        message="This is a warning message without a title."
        variant="standard"
        closable={true}
        open={showWarning}
        onClose={() => setShowWarning(false)}
      />

      {/* Simple alerts without close button */}
      <CustomAlert
        severity="error"
        message="Network connection failed"
        variant="outlined"
      />

      <CustomAlert
        severity="info"
        message="Loading data..."
        variant="standard"
      />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => {
            setShowError(true);
            setShowNoItems(true);
            setShowSuccess(true);
            setShowWarning(true);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset All Alerts
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3>Usage Examples:</h3>
        <pre
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "4px",
            overflow: "auto",
          }}
        >
          {`// Basic error alert
<CustomAlert 
  severity="error" 
  message="Something went wrong!" 
/>

// No items alert with title
<CustomAlert
  severity="info"
  title="No Items Found"
  message="There are no items to display."
  variant="outlined"
/>

// Closable success alert
<CustomAlert
  severity="success"
  title="Success"
  message="Operation completed!"
  closable={true}
  onClose={() => console.log('Alert closed')}
/>

// Warning with custom styling
<CustomAlert
  severity="warning"
  message="Warning message"
  sx={{ borderRadius: 2 }}
/>`}
        </pre>
      </div>
    </div>
  );
};

export default AlertDemo;
