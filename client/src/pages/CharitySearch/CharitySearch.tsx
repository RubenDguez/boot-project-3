import { Typography, TextField, Card, CardContent, Grid, Button } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect } from 'react';
import { searchCharities } from '../../utils/API.js';

interface Charity {
  id: number;
  name: string;
  description: string;
}

export default function CharitySearch() {
  useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [cityName, setCityName] = useState('');
  const [charities, setCharities] = useState<Charity[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (!searchTriggered) return;

    const getCharities = async () => {
      try {
        const data = await searchCharities(searchTerm, cityName);
        setCharities(data);
      } catch (error) {
        console.error('Error fetching charities:', error);
      } finally {
        setSearchTriggered(false);
      }
    };

    getCharities();
  }, [searchTriggered, searchTerm, cityName]);

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  return (
    <div>
      <Typography variant="h2">Charity Search</Typography>
      {/* <TextField
        label="Search Charities"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <TextField
        label="City Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
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
