import { CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Charity from './Charity.png';
const CalendarCard = () => {
  return (

  <Card sx={{ backgroundColor: '#9AC171', display:'flex',justifyContent:'space-around'}}>
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-around' }}>
    <CardContent>
      <Typography gutterBottom variant="h4" component="div">
        Chairty Event Title
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Event Time & Date
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Event Location
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Delete</Button>
      <Button size="small">Reschedule</Button>
      <Button size="small">Mark Complete</Button>
    </CardActions>
    </Box>
    <CardMedia sx={{width:'200px', display:'flex'}}>
      <img src={Charity} alt="random" style={{width:'100%'}} />
      {/* placeholder for charity image */}
    </CardMedia>
  </Card>
);
};

export default CalendarCard;
