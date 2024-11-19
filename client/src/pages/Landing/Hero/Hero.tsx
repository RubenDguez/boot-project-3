import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        height: '60vh',
        backgroundImage: `url(/yellow.png)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Box
        component="nav"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 3rem',
        }}
      >
        <Box>
          <Typography>App Name Here</Typography>
        </Box>
        <Box>
          <Button variant="text" size="small" color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button variant="text" size="small" color="inherit" onClick={() => navigate('/signup')}>
            Sign Up
          </Button>
          <Button variant="text" size="small" color="inherit" onClick={() => navigate('/about')}>
            About
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0px 2rem', height: '80%' }}>
        <Typography variant="h3">The Title Goes Here</Typography>
        <Typography variant="h5">Subtitle</Typography>
      </Box>
    </Box>
  );
}
