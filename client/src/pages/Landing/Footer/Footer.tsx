import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
 const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10rem',
        backgroundColor: '#34471f',
      }}
    >
      <Box>
      <IconButton sx={{ color: theme.palette.tertiary.main }}>
          <GitHubIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.tertiary.main }}>
          <LinkedInIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.tertiary.main }}>
          <FacebookIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.tertiary.main }}>
          <InstagramIcon />
        </IconButton>
        <IconButton sx={{ color: theme.palette.tertiary.main }}>
          <XIcon />
        </IconButton>
      </Box>
      <Typography sx={{ color: theme.palette.tertiary.main }}>Better Together - All rights reserved &copy; {new Date().getFullYear().toString()}</Typography>
    </Box>
  );
}
