import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Charity from "./Charity.png";

interface CalendarCardProps {
  key: number;
  title: string;
  date: string;
  location: string;
}

// const { username } = useParams<{ username: string }>();
// let userId: string | undefined;

// if (data) {
//   const user = data.users.find((user: { username: string }) => user.username === username);
//   if (user) {
//     userId = user._id;
//   }
// }

const CalendarCard: React.FC<CalendarCardProps> = ({
  title,
  date,
  // details,
  location,
}) => {
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
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {date}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {location}
          </Typography>
          {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {details}
      </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">Delete</Button>
          <Button size="small">Reschedule</Button>
          <Button size="small">Mark Complete</Button>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "50%", 
              display:{xs:'none',sm:'flex'} 
            }}
        image={Charity}
        alt="random"
      />
    </Card>

    </>
  );
};

export default CalendarCard;
