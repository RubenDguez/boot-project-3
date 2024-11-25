import { Typography, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { SEARCH_CHARITIES } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_CHARITY } from '../../utils/mutations';
import CharityCard from '../../components/CharityCard/CharityCard';

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

const availableCauses = [
'Adoption',
'Afghanistan',
'Animals',
'Art',
'Athletics',
'Autism',
'Black-led',
'Buddhism',
'Cancer',
'Cats',
'Christianity',
'Climate',
'Conservation',
'Coronavirus',
'Culture',
'Dance',
'Disabilities',
'Disease',
'Dogs',
'Education',
'Environment',
'Film and TV',
'Food-security',
'Freepress',
'Gender-equality',
'Health',
'Hinduism',
'Housing',
'Humans',
'Hurricane-ian',
'Immigrants',
'Indigenous-led',
'Indigenous-peoples',
'Islam',
'Judaism',
'Justice',
'Latine-led',
'Legal',
'LGBT',
'Libraries',
'Mental-health',
'Museums',
'Music',
'Oceans',
'Parks',
'Poverty',
'Racial Justice',
'Radio',
'Refugees',
'Religion',
'Research',
'Science',
'Seniors',
'Space',
'Theater',
'Transgender',
'Ukraine',
'Veterans',
'Voting Rights',
'Water',
'Wildfires',
'Women-led',
'Womens Health',
'Youth',
];

export default function CharitySearch() {
 useAuth();
  const { loading, error, data, refetch } = useQuery<SearchCharitiesData, SearchCharitiesVars>(
    SEARCH_CHARITIES
  );

  const [city, setCity] = useState('');
  const [cause, setCause] = useState('');
  const [charity, setCharity] = useState<Charity>();
  const {name, description, image, locationAddress, website} = charity || {};
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const handleSearch = () => {
    refetch({ city, cause }).then((result) => {
      if (result.data.searchCharities.length === 0) {
        setSearchError('No charities found for the selected city and cause.');
      } else {
        setSearchError(null);
      }
    });
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
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Search Charities</Typography>
      <TextField
        label="Type a City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        margin="normal"
     
      />
     <FormControl margin="normal">
        <Select
          value={cause}
          onChange={(e) => setCause(e.target.value)}
          variant="outlined"
          displayEmpty
          sx={{
            color: 'primary.main', // Change the text color of the selected item
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary', // Change the border color
            },
            '.MuiSvgIcon-root': {
              color: 'primary.secondary',
            },
            '.MuiSelect-select': {
              color: ' #e7decd', // Change the text color of the selected item
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'secondary.main', // Change the background color of the dropdown menu
                '& .MuiMenuItem-root': {
                  color: ' #e7decd', // Change the text color of the menu items
                },
                '& .MuiMenuItem-root:hover': {
                  bgcolor: 'primary.light', // Change the background color of the menu items on hover
                },
              },
            },
          }}
        >
           <MenuItem value="" disabled sx={{ fontFamily: 'Arial, sans-serif', fontStyle: 'italic', color: 'black'}}>
            <em>Select a cause</em>
          </MenuItem>
          {availableCauses.map((cause) => (
            <MenuItem key={cause} value={cause}>
              {cause}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginTop: '1rem' }}>
        Search
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error.message}</Typography>}
      {!loading && !error && data && (
     <Box sx={{ marginTop: '2rem' }}>
          {data.searchCharities.map((charity) => (
     <Box key={charity._id} sx={{ marginBottom: '1rem' }}>
              <Typography variant="h6">{charity.name}</Typography>
              <Typography>{charity.description}</Typography>
              <Typography>{charity.locationAddress}</Typography>
              <img src={charity.image} alt={charity.name} />
              
              {charity.website && (
                <Typography>
                  <a href={charity.website} target="_blank" rel="noopener noreferrer">
                    {charity.website}
                  </a>
                </Typography>
              )}
                <Button variant="contained" color="secondary" onClick={() => handleAdd(charity._id)}> 
                  Add Charity
                </Button>
              <Button onClick={() => handleAdd(charity._id)} sx={{color:'white'}}>Add To Calendar</Button>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}