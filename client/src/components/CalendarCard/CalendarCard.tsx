import {Typography, Card, CardContent, CardActions, Button, Box, CardMedia, Divider }from "@mui/material";
import Charity from "./Charity.png";
import { DELETE_EVENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
interface CalendarCardProps {
  key: number;
  title: string;
  date: string;
  location: string;
}


const CalendarCard: React.FC<CalendarCardProps> = ({
  title,
  date,
  location,
}) => {
  return (
    <>
    const [deleteEvent] = useMutation(DELETE_EVENT);

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
            image={Charity}
            alt="random"
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
                <strong>When: </strong>{date}
              </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
              <Button size="small">Delete</Button>
              <Button size="small">Reschedule</Button>
              <Button size="small">Mark Complete</Button>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CalendarCard;
