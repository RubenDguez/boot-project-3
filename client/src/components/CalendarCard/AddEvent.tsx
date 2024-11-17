import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

export default function AddEvent() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-label="add event"
        sx={{ color: "#E7DECD" }}
        onClick={handleClickOpen}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const eventName = formJson.eventName;
            console.log(eventName);
            handleClose();
          },
        }}
      >
      
        <DialogTitle>AddEvent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm Event Information before adding to the calendar.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Event Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            Add Event Location
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="location"
            label="Event Location"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            Event Details
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            label="Event Details"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogContentText>
            Confirm Time
          </DialogContentText>
          <TextField 
            autoFocus
            required
            margin="dense"
            id="time"
            type="time"
            fullWidth
            variant="standard"
            disabled
            defaultValue="Hello World"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">ADD</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
