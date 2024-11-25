import { Card, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center'
      }}
    >
      <Box sx={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <Typography variant='h4' sx={{ borderRight: '2px solid black', paddingRight: '2rem', color: 'black' }}>404</Typography>
        <Typography variant='h5' sx={{ paddingRight: '2rem', color: 'black' }} > <strong>WOAH! YOU'VE GONE BANANAS!</strong></Typography>
      </Box>
      <Typography variant='h6' sx={{ marginTop: '2rem', marginBottom: '1rem', }}>
      </Typography>
      <Card
        sx={{
          padding: 2,
          width: 300,
          textAlign: "center",
          backgroundColor: "secondary.main",
          marginBottom: '1rem'
        }}
      >
        <iframe
          src="https://giphy.com/embed/H8uuXYln5pxVVLFn7k"
          height="270"
          frameBorder="0"
          allowFullScreen
          title="Bananas GIF"
          style={{ width: "100%", border: '8px solid black' }}
        ></iframe>
      </Card>
      <Link to="/">
        <Button sx={{ color: 'white', backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'primary.main' } }}>Go to Login Page</Button>
      </Link>
    </Box>
  );
}