import { Typography, Button, TextField, Box, Select, MenuItem, FormControl, InputLabel, Alert, useMediaQuery } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { SEARCH_CHARITIES } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_CHARITY } from '../../utils/mutations';
import CharityCard from '../../components/CharityCard/CharityCard';
import { useTheme } from '@mui/material/styles';

interface Charity {
  _id: string;
  name: string;
  description: string;
  image?: string;
  website?: string;
  locationAddress: string;
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { loading, error, data, refetch } = useQuery<SearchCharitiesData, SearchCharitiesVars>(
    SEARCH_CHARITIES
  );

  const [city, setCity] = useState('');
  const [cause, setCause] = useState('');
  const [charity, setCharity] = useState<Charity>();
  const { name, description, image, locationAddress, website } = charity || {};
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
          input: {
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

  const handleAddToCalendar = (id: string) => {
    console.log("Adding charity to calendar with id:", id);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  const defaultImage = '/logo.png';

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Search Charities</Typography>
     
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
         <TextField
        label="Type a City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        variant="outlined"
        margin="normal"
        sx={{
          backgroundColor: 'secondary.main', // Change the background color
          '& .MuiInputBase-root': {
            color: '#e7decd', // Change the text color
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary', // Change the border color
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary', // Change the border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black', // Change the border color when focused
          },
        }}
        InputLabelProps={{
          sx: {
            color: 'white', // Change the label font color
          },
        }}
      />

      <FormControl margin="normal" sx={{ minWidth: 200 }}>
        <InputLabel sx={{ color: 'white' }}></InputLabel>
        <Select
         label="Select A Cause"
          value={cause}
          onChange={(e) => setCause(e.target.value)}
          variant="outlined"
          displayEmpty
          sx={{
            backgroundColor: 'secondary.main', // Change the background color
            color: 'secondary.main', // Change the text color of the selected item
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
          <MenuItem value="" disabled sx={{ fontFamily: 'Arial, sans-serif', fontStyle: 'italic', color: 'black' }}>
            <em>Select a cause</em>
          </MenuItem>
          {availableCauses.map((cause) => (
            <MenuItem key={cause} value={cause}>
              {cause}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSearch} sx={{
        marginTop: '1rem',
        backgroundColor: 'primary.dark', // Change the background color
        color: 'white', // Change the text color
        '&:hover': {
          backgroundColor: 'primary.main', // Change the background color on hover
        },
      }}>
        Search
      </Button>
      </Box>

      {searchError && <Alert severity="error">{searchError}</Alert>}

      <Box sx={{ marginTop: '2rem' }}>
        {data?.searchCharities.map((charity) => (
          <Box key={charity._id}>
            <CharityCard
              id={charity._id}
              name={charity.name}
              title={charity.name}
              description={charity.description}
              location={charity.locationAddress}
              website={charity.website}
              image={charity.image?? defaultImage}
              onAdd={() => handleAdd(charity._id)}
              onAddToCalendar={() => handleAddToCalendar(charity._id)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

{/* <Button variant="contained" color="secondary" onClick={() => handleAdd(charity._id)}> 
Add Charity
</Button>
<Button onClick={() => handleAdd(charity._id)} sx={{color:'white'}}>Add To Calendar</Button> */}
