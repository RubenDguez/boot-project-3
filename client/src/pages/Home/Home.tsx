import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.ts';

export default function Main() {
  useAuth();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1 }}>

      <Container maxWidth="lg" sx={{ padding: '2rem' }}>
        <Outlet />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', padding: '0' }}>
          <img src="/logovideo.gif" alt="Logo GIF" style={{ width: '50%' }} />
        </Box>
      </Container>
    </Box>
  );
}
