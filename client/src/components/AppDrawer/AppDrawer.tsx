import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HomeIcon from '@mui/icons-material/Home';
import { Avatar, Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const drawerOptions1 = [
  { label: 'Home', icon: <HomeIcon />, to: '/app' },
  { label: 'Charity Search', icon: <VolunteerActivismIcon />, to: '/app/charity-search' },
  { label: 'Service Calendar', icon: <CalendarMonthIcon />, to: '/app/service-calendar'},
  { label: 'Help Board', icon: <NotListedLocationIcon />, to: '/app/help-board' },
];

export default function AppDrawer({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navigate = useNavigate();

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
          <Avatar sx={{ backgroundColor: '#34471f', color: 'white', width: 112, height: 112 }} alt="Seek Help" src="/magnifier.jpg" />
          <Typography variant='h5'>Help Seeker</Typography>
        </Box>
        <Divider />
        {DrawerList}
      </Drawer>
    </div>
  );
}
