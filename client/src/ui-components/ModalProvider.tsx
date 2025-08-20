import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Box,
  useTheme,
  alpha,
  Slide,
} from "@mui/material";
import { X, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

type ModalType = "success" | "error" | "warning";

interface ModalState {
  isOpen: boolean;
  type: ModalType | "";
  message: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalDispatchProps {
  type: ModalType;
  message: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextType {
  modalDispatch: (props: ModalDispatchProps) => void;
}

// Create context with correct type
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Transition component for smooth animations
const Transition = React.forwardRef(function Transition(
  props: any,
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: "",
    message: "",
  });

  const closeModal = () => {
    setModal({
      isOpen: false,
      type: "",
      message: "",
      onConfirm: undefined,
      onCancel: undefined,
    });
  };

  const modalDispatch = ({
    type,
    message,
    onConfirm,
    onCancel,
  }: ModalDispatchProps) => {
    setModal({
      isOpen: true,
      type,
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        closeModal();
      },
      onCancel: () => {
        if (onCancel) onCancel();
        closeModal();
      },
    });
  };

  // Get modal configuration based on type
  const getModalConfig = (type: ModalType | "") => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          color: theme.palette.success.main,
          bgColor: alpha(theme.palette.success.main, 0.1),
          title: "Success",
        };
      case "error":
        return {
          icon: AlertCircle,
          color: theme.palette.error.main,
          bgColor: alpha(theme.palette.error.main, 0.1),
          title: "Error",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          color: theme.palette.warning.main,
          bgColor: alpha(theme.palette.warning.main, 0.1),
          title: "Warning",
        };
      default:
        return {
          icon: AlertCircle,
          color: theme.palette.text.primary,
          bgColor: alpha(theme.palette.grey[500], 0.1),
          title: "Info",
        };
    }
  };

  const config = getModalConfig(modal.type);
  const IconComponent = config.icon;

  return (
    <ModalContext.Provider value={{ modalDispatch }}>
      {children}

      <Dialog
        open={modal.isOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiDialog-container": {
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: alpha(theme.palette.common.black, 0.6),
            backdropFilter: "blur(8px)",
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: `linear-gradient(135deg, ${
              theme.palette.background.paper
            } 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
            backdropFilter: "blur(20px)",
            overflow: "hidden",
            maxWidth: "480px",
            width: "90%",
            mx: 2,
          },
        }}
      >
        {/* Enhanced Header with Icon */}
        <Box
          sx={{
            position: "relative",
            background: `linear-gradient(135deg, ${config.bgColor} 0%, ${alpha(
              config.color,
              0.05
            )} 100%)`,
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Icon Circle */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: alpha(config.color, 0.15),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconComponent size={24} color={config.color} strokeWidth={2} />
          </Box>

          {/* Title */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: config.color,
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: "-0.025em",
                mb: 0.5,
              }}
            >
              {config.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: alpha(theme.palette.text.secondary, 0.8),
                fontSize: "0.875rem",
              }}
            >
              {modal.type === "success"
                ? "Operation completed successfully"
                : modal.type === "error"
                ? "Something went wrong"
                : "Please review and confirm"}
            </Typography>
          </Box>

          {/* Close Button */}
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              width: 32,
              height: 32,
              backgroundColor: alpha(theme.palette.common.black, 0.04),
              borderRadius: "50%",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.1),
                transform: "scale(1.1)",
              },
            }}
          >
            <X size={16} />
          </IconButton>
        </Box>

        {/* Enhanced Content */}
        <DialogContent
          sx={{
            px: 3,
            py: 3,
            textAlign: "center",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${alpha(
                config.color,
                0.3
              )}, transparent)`,
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.primary,
              fontSize: "1rem",
              lineHeight: 1.6,
              fontWeight: 500,
              // mt: 1,
              my: 3,
            }}
          >
            {modal.message}
          </Typography>
        </DialogContent>

        {/* Enhanced Actions */}
        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            pt: 0,
            justifyContent: "center",
            gap: 4,
          }}
        >
          {modal.type === "warning" ? (
            <>
              <Button
                onClick={modal.onCancel}
                variant="outlined"
                sx={{
                  minWidth: 100,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  border: `1px solid ${alpha(theme.palette.grey[400], 0.5)}`,
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.grey[100], 0.8),
                    borderColor: theme.palette.grey[400],
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                onClick={modal.onConfirm}
                sx={{
                  minWidth: 100,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  backgroundColor: config.color,
                  boxShadow: `0 4px 12px ${alpha(config.color, 0.3)}`,
                  "&:hover": {
                    backgroundColor: config.color,
                    filter: "brightness(1.1)",
                    transform: "translateY(-1px)",
                    boxShadow: `0 6px 16px ${alpha(config.color, 0.4)}`,
                  },
                }}
              >
                Continue
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={modal.onConfirm}
              sx={{
                minWidth: 120,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                backgroundColor: config.color,
                boxShadow: `0 4px 12px ${alpha(config.color, 0.3)}`,
                "&:hover": {
                  backgroundColor: config.color,
                  filter: "brightness(1.1)",
                  transform: "translateY(-1px)",
                  boxShadow: `0 6px 16px ${alpha(config.color, 0.4)}`,
                },
              }}
            >
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </ModalContext.Provider>
  );
};

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
