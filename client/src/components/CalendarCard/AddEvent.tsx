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
import { USER_CHARITIES,GET_EVENTS } from "../../utils/queries";
import { useQuery,useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";

interface AddEventProps {
  value: Dayjs | null;
}

export default function AddEvent(AddEventProps: AddEventProps) {
  const [open, setOpen] = React.useState(false);
  const [charity, setCharity] = React.useState<any>({});
  // we want set charity to be a single charity object

  const [createEvent] = useMutation(ADD_EVENT);
  const { data: userCharitiesData } = useQuery(USER_CHARITIES);
  const { data: eventsData } = useQuery(GET_EVENTS);
  // console.log("ladata", data);
  const charities = userCharitiesData?.findUserCharities || [];
  React.useEffect(() => {
    setCharity(charities);
  }, [userCharitiesData]);
  // console.log("i am set charity", charity);
  const { name, locationAddress, description, image } = charity;
  // console.log("i am name", name);
  // console.log("i am charities", charities);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    try {
      await createEvent({
      variables: {
        input:{
        eventImage: image,
        eventName: name,
        eventLocation: locationAddress,
        eventDate: AddEventProps.value?.format("YYYY-MM-DDTHH:mm"),
        },
      },
      refetchQueries: [GET_EVENTS ],
    });
    handleClose();
    } catch (error) {
      console.log("Error creating event:", error);
    }
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
          onSubmit: handleSubmit,
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
                <MenuItem 
                key={charity.id} 
                value={charity.name}>
                  {charity.name}
                </MenuItem>
              ))}
            </Select>
          <DialogContentText>Charity Name</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="location"
            name="location"
            type="text"
            fullWidth
            variant="standard"
            value={locationAddress}
            disabled
          />
          <DialogContentText>Event Location</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            disabled
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
            disabled
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


