import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Box, IconButton, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10rem',
        backgroundColor: 'black',
      }}
    >
      <Box>
        <IconButton color="info">
          <GitHubIcon />
        </IconButton>
        <IconButton color="info">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="info">
          <FacebookIcon />
        </IconButton>
        <IconButton color="info">
          <InstagramIcon />
        </IconButton>
        <IconButton color="info">
          <XIcon />
        </IconButton>
      </Box>
      <Typography color="info">Project 3 - All rights reserved &copy; {new Date().getFullYear().toString()}</Typography>
    </Box>
  );
}
