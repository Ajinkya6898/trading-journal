import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ModalType = "success" | "error" | "warning";

interface ModalState {
  isOpen: boolean;
  type: ModalType | "";
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalDispatchProps {
  type: ModalType;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextType {
  modalDispatch: (props: ModalDispatchProps) => void;
}

// Create context with correct type
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  return (
    <ModalContext.Provider value={{ modalDispatch }}>
      {children}

      <Dialog
        open={modal.isOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        sx={{
          width: "600px",
          margin: "auto",
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2,
          },
        }}
      >
        <DialogTitle
          component="span"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color:
                modal.type === "success"
                  ? "success.main"
                  : modal.type === "error"
                  ? "error.main"
                  : "warning.main",
              fontWeight: 600,
            }}
          >
            {modal.type === "success"
              ? "Success"
              : modal.type === "error"
              ? "Error"
              : "Warning"}
          </Typography>

          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 2, py: 0 }}>
          <Divider />
          <Typography variant="body1" align="center" sx={{ my: 4 }}>
            {modal.message}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", mt: 2, px: 2 }}>
          {modal.type === "warning" ? (
            <>
              <Button onClick={modal.onCancel} variant="outlined">
                Cancel
              </Button>

              <Button onClick={modal.onConfirm} sx={{ ml: 2 }}>
                Continue
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={modal.onConfirm}>
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
