import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

// A reusable confirmation dialog component
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  dialogText = "Are you sure?",
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog"
      className="dialog-box"
    >
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {dialogText}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-around" }}>
        <Button onClick={onClose} className="cancel-btn" autoFocus>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} className="confirm-btn" color="error">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
