import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import {SEARCH_CHARITIES} from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';


interface Charity {
  _id: string;
  name: string;
  description: string;
  image?: string;
  website?: string;
  locationAddress: string;
  nonprofitTags: string[];
}

interface SearchCharitiesData {
  searchCharities: Charity[];
}

interface SearchCharitiesVars {
  city?: string;
  cause?: string;
}

export default function CharitySearch() {
 useAuth();
  const { loading, error, data, refetch } = useQuery<SearchCharitiesData, SearchCharitiesVars>(
    SEARCH_CHARITIES
  );


  const [city, setCity] = useState('');
  const [cause, setCause] = useState('');

  const handleSearch = () => {
    refetch({ city, cause });
  };

  return (
    <div>
      <Typography variant="h4">Search Charities</Typography>
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Cause"
        value={cause}
        onChange={(e) => setCause(e.target.value)}
        variant="outlined"
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}
      {!loading && !error && data && (
        <div>
          {data.searchCharities.map((charity) => (
            <div key={charity._id}>
              <Typography variant="h6">{charity.name}</Typography>
              <Typography>{charity.description}</Typography>
              <Typography>{charity.locationAddress}</Typography>
              <Typography>{charity.website}</Typography>
              <img src={charity.image} alt={charity.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
  

}


