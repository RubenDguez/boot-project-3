import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';

// export default function CharitySearch() {
//   useAuth();
//   return <Typography variant="h2">Charity Search</Typography>;
// }
import { useState, useEffect } from 'react';
import { TextField, Card, CardContent, Grid } from '@mui/material';

interface Charity {
  id: number;
  name: string;
  description: string;
}

export default function CharitySearch() {
  useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    fetch(`https://api.example.com/charities?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => setCharities(data))
      .catch(error => console.error('Error fetching charities:', error));
  }, [searchTerm]);

  return (
    <div>
      <Typography variant="h2">Charity Search</Typography>
      <TextField
        label="Search Charities"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2}>
        {charities.map((charity) => (
          <Grid item xs={12} sm={6} md={4} key={charity.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{charity.name}</Typography>
                <Typography variant="body2">{charity.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
