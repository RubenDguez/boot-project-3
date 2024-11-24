import {Typography, Card, CardContent, CardActions, Button, Box, CardMedia, Divider }from "@mui/material";
import Charity from "./Charity.png";
import { DELETE_EVENT } from "../../utils/mutations";
import { GET_EVENTS } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import {DateTime} from 'luxon';
interface CalendarCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  title,
  date,
  location,
  id,
  image
}) => {
  const { data } = useQuery(GET_EVENTS);
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent({
        variables: {
          eventId: id
        },
    refetchQueries: [GET_EVENTS],
      });
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  }

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#9AC171",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "150px",
        }}
      >
        <Box
          sx={{
            display: "flex",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "150px", display: { xs: "none", sm: "flex" } }}
            image={image}
            alt="event image"
          />
          <Box sx={{width:'100%'}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
          {title}
              </Typography>
              <Divider />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem' }} >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>Where: </strong>{location}
          </Typography>  
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <strong>When: </strong>{DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)}
          </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button size="small" onClick={() => handleDelete(id)}>Mark Complete</Button>
              <Button size="small">Reschedule</Button>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CalendarCard;
