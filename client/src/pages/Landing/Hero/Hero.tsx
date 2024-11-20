import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Hero() {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        height: '60vh',
        backgroundImage: `url(together.jpg)`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
        <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '60%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the transparency here
        }}
      />
      <Box
        component="img"
        src="/logotransparent.png"
        alt="Transparent Logo Overlay"
        sx={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50%',
          height: 'auto',
        }}
      />
      <Box
        component="nav"
        sx={{
          display: 'flex',
          color: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem 3rem',
          position: 'relative',
        }}
      >
        <Box>
          <Typography>BETTER TOGETHER</Typography>
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
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0px 2rem', height: '80%', position: 'relative', color: 'white', }}>
      </Box>
    </Box>
  );
}
