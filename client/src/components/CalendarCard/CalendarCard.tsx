import { CardMedia, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

<Card>
    <CardContent>
        <Typography gutterBottom variant="h3" component="div">
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
    <CardMedia>
        <img src="https://source.unsplash.com/random" alt="random" />
        {/* placeholder for charity image */}
    </CardMedia>
</Card>
