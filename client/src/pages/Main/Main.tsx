import { Box, Container } from '@mui/material';
import { AppBar, AppDrawer } from '../../components/index';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar setOpenDrawer={setOpenDrawer} />
      <AppDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <Container maxWidth='lg' sx={{ padding: '2rem' }}>
        <Outlet />
      </Container>
    </Box>
  );
}
