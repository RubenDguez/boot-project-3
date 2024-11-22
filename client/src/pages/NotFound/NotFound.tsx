import { Box, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto',
        height: '100vh',
        justifyContent: 'center',
        alignContent: 'center'
      }}
    >
      <Box sx={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
      }}>
        <Typography variant='h4' sx={{ borderRight: '2px solid black', paddingRight: '2rem' }}>404</Typography>
        <Typography variant='h6' >Woah! You've gone BANANAS!</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <iframe
          src="https://giphy.com/embed/H8uuXYln5pxVVLFn7k"
          height="270"
          frameBorder="0"
          allowFullScreen
          title="Bananas GIF"
        ></iframe>
      </Box>
    </Box> 
  );
}