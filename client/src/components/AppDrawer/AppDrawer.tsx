import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Avatar, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const drawerOptions1 = [
  { label: 'Home', icon: <HomeIcon />, to: '/app/home' },
  { label: 'Charity Search', icon: <VolunteerActivismIcon />, to: '/app/charity-search' },
  { label: 'Service Calendar', icon: <CalendarMonthIcon />, to: '/app/service-calendar' },
  { label: 'Help Board', icon: <HandshakeIcon />, to: '/app/help-board' },
];

export default function AppDrawer({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();
  const { logout } = useAuth({ needsAuth: false });

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        {drawerOptions1.map((item, index) => (
          <ListItem key={item.label + index} disablePadding>
            <ListItemButton onClick={() => navigate(item.to)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { backgroundColor: '#9ac171', color: '#2e382e' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center', alignItems: 'center', padding: '2rem 0px' }}>
          <Avatar sx={{ backgroundColor: '#34471f', color: 'white', width: 112, height: 112 }} alt="Better Together Logo" src="/logoimage.png" />
          <Typography variant="h5">Better Together</Typography>
        </Box>
        <Divider />
        {DrawerList}
        <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <Divider />
          <ListItem key="logout" disablePadding sx={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <ListItemButton sx={{ width: '100%' }} onClick={() => {navigate('/app/about'); setOpen(false);}}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton sx={{ width: '100%' }} onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
    </div>
  );
}
