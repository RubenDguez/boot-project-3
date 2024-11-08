import { Box, Container, Typography } from '@mui/material';
import Footer from './Footer/Footer';
import Hero from './Hero/Hero';

export default function Landing() {
  return (
    <Container maxWidth="xl">
      <Hero />
      <Box
        component="section"
        sx={{
          backgroundColor: 'black',
        }}
      >
        <Typography color="info">Additional information in this section</Typography>
      </Box>
      <Footer />
    </Container>
  );
}
