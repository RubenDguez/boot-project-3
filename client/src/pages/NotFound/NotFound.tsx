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
        <Typography variant='button'>This page was not found</Typography>
      </Box>
    </Box>
  );
}
