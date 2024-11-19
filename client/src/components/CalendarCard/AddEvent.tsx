import * as React from "react";
import Button from "@mui/material/Button";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";

interface AddEventProps {
  value: Dayjs | null;
}

export default function AddEvent(AddEventProps: AddEventProps) {
  const [open, setOpen] = React.useState(false);
  const [eventName, setEventName] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDetails, setEventDetails] = React.useState("");

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
            const eventName = formJson.name;
            const eventLocation = formJson.location;
            const eventDetails = formJson.details;
            const eventTime = formJson.time
            console.log(formJson);
          
            const events = JSON.parse(localStorage.getItem("events") || "[]");
            events.push({ eventName, eventLocation, eventDetails, eventTime });
            localStorage.setItem("events", JSON.stringify(events));
            console.log(eventName, eventLocation, eventDetails, eventTime);
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
            name="name"
            label="Event Name"
            value={eventName}
            onChange={(event) => setEventName(event.target.value)}
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
            name="location"
            label="Event Location"
            type="text"
            fullWidth
            variant="standard"
            value={eventLocation}
            onChange={(event) => setEventLocation(event.target.value)}
          />
          <DialogContentText>
            Event Details
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="Event Details"
            type="text"
            fullWidth
            variant="standard"
            value={eventDetails}
            onChange={(event) => setEventDetails(event.target.value)} 
          />
          <DialogContentText>
            Confirm Time
          </DialogContentText>
          <TextField 
            autoFocus
            required
            margin="dense"
            id="time"
            name="time"
            type="datetime-local"
            fullWidth
            variant="standard"
            defaultValue={AddEventProps.value?.format("YYYY-MM-DDTHH:mm")}
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
