import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const Notification = ({ open, title, message, onConfirm, onClose, id }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{onConfirm(id); onClose();}} color="primary" variant="contained">
          Yes
        </Button>
        <Button onClick={onClose} color="secondary" variant="outlined">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Notification;
