import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import type { Breakpoint } from "@mui/material/styles";

type IProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  submitButtonText?: string;
  disabledSubmitButton?: boolean;
  withoutSubmit?: boolean;
  withCancelButton?: boolean;
  maxWidth?: Breakpoint;
  fullWidth?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};

export const ModalWindow = ({
  open,
  title,
  children,
  submitButtonText,
  disabledSubmitButton,
  withoutSubmit,
  withCancelButton,
  maxWidth,
  fullWidth = true,
  onClose,
  onSubmit,
}: IProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 13,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          {children}
        </form>
      </DialogContent>

      {!withoutSubmit && (
        <DialogActions sx={{ p: 3, pt: 1 }}>
          {withCancelButton && (
            <Button onClick={onClose} variant="text">
              <Box
                sx={{
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                Отменить
              </Box>
            </Button>
          )}

          <Button
            onClick={onSubmit}
            disabled={disabledSubmitButton}
            variant="contained"
            color="primary"
            type="submit"
          >
            {submitButtonText ?? "Подтвердить"}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
