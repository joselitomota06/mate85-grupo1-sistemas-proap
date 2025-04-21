import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

/**
 * Generic confirmation dialog component
 * Used for confirming user actions with a modal dialog
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Sim',
  cancelLabel = 'Não',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <b>{message}</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelLabel}</Button>
        <Button onClick={onConfirm} autoFocus>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
