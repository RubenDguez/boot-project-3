import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import useAuth from '../../hooks/useAuth';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import CalendarCard from '../../components/CalendarCard/CalendarCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
// import theme from '../../theme/index';
import FormDialog from '../../components/CalendarCard/AddEvent';

export default function ServiceCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  console.log(value);
  // useAuth();

  return (
    < Grid container spacing={2} >
      <Grid size={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <StaticDateTimePicker
            orientation="landscape"
            openTo='day'
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{ backgroundColor: '#9AC171'}}
            slotProps={{
              actionBar: {
                actions: ["today", "accept",],
              },
            }}
          />
        </LocalizationProvider>
        
      </Grid>
      <Grid size={6}>
        <Stack spacing={1} >
          <IconButton aria-label='add event' sx={{ color: '#E7DECD' }} onClick={FormDialog}>
            <AddCircleIcon  fontSize='large' />
          </IconButton>  
          {/* <CalendarCard /> */}
        </Stack>
      </Grid>

    </Grid>
  );
}
