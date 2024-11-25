import { Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import {SEARCH_CHARITIES} from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { ADD_CHARITY } from '../../utils/mutations';

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
  const [charity, setCharity] = useState<Charity>();
  const {name, description, image, locationAddress, website} = charity || {};
  console.log('I am set: ',charity);
  
  const handleSearch = () => {
    refetch({ city, cause });
  };
  
const [AddCharity] = useMutation(ADD_CHARITY);
const handleAdd = async (id: string) => {
  console.log("Adding charity with id:", id);
  setCharity(data?.searchCharities.find((charity) => charity._id === id) as Charity);
  
    try {
      await AddCharity({
        variables: {
          input:{
            description: description,
            image: image,
            locationAddress: locationAddress,
            name: name,
            website: website,
          }
        },
      });
    } catch (error) {
      console.error("Error adding charity:", error);
    }
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
            <div key={charity._id} id={charity._id}>
              <Typography variant="h6">{charity.name}</Typography>
              <Typography>{charity.description}</Typography>
              <Typography>{charity.locationAddress}</Typography>
              <Typography>{charity.website}</Typography>
              <img src={charity.image} alt={charity.name} />
              <Button onClick={() => handleAdd(charity._id)} sx={{color:'white'}}>Add To Calendar</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  

}
