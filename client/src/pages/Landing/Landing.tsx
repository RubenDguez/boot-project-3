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
          backgroundColor: 'secondary.main',
        }}
      >
        <Typography color="tertiary.main"></Typography>
      </Box>
      <Footer />
    </Container>
  );
}
