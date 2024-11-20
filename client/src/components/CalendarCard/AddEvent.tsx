import * as React from "react";
import { Dayjs } from "dayjs";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  IconButton,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { USER_CHARITIES } from "../../utils/queries";
import { useQuery,useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../../utils/mutations";

interface AddEventProps {
  value: Dayjs | null;
}

export default function AddEvent(AddEventProps: AddEventProps) {
  const [open, setOpen] = React.useState(false);
  const [charity, setCharity] = React.useState<any>({});
  // we want set charity to be a single charity object
  // const [charites, setCharities] = React.useState<any>();
  // const [selectedCharity, setSelectedCharity] = React.useState<any>();
  // const [eventLocation, setEventLocation] = React.useState("");
  // const [eventDetails, setEventDetails] = React.useState("");

  const [createEvent] = useMutation(CREATE_EVENT);
  const { data } = useQuery(USER_CHARITIES);
  console.log("ladata", data);
  const charities = data?.findUserCharities || [];
  React.useEffect(() => {
    setCharity(charities);
  }, [data]);
  console.log("i am set charity", charity);
  const { name, locationAddress, description,image } = charity;
  console.log("i am name", name);
  console.log("i am charities", charities);
  
// console.log("charityset location", eventLocation);

  // const charityNames = charities.map((charity: any) => charity.name);
  // console.log("i am charity names", charityNames);
  // const locations = charities.map((charity: any) => charity.locationAddress);
  // console.log("i am locations", locations);
  // console.log("i am set charity", charity);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const handleSubmit = () => {
  createEvent({
    variables: {
      image: image,
      eventName: name,
      eventLocation: locationAddress,
      eventDate: AddEventProps.value?.format("YYYY-MM-DDTHH:mm"),
      },
    });
    console.log("event props", createEvent);
  }
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
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>AddEvent</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm Event Information before adding to the calendar.
          </DialogContentText>
            <Select
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Event Name"
              value={name}
              // need to the name value of the charity
              onChange={(event) => {
                const selectedCharity = charities.find((c: any) => c.name === event.target.value);
                setCharity(selectedCharity);
              }}
              type="text"
              fullWidth
              variant="standard"
            >
              {charities?.map((charity: any) => (
                <MenuItem key={charity.id} value={charity.name}>
                  {charity.name}
                </MenuItem>
              ))}
            </Select>
          <DialogContentText>Add Event Location</DialogContentText>
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
            value={locationAddress}
            
          />
          <DialogContentText>Event Details</DialogContentText>
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
            value={description}
          />
          <DialogContentText>Confirm Time</DialogContentText>
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
          <Button type="submit" onClick={handleSubmit}>ADD</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
