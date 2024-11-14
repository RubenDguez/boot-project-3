import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import useAuth from '../../hooks/useAuth';


export default function ServiceCalendar() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    console.log(value);
    useAuth();
    
  return (

    <LocalizationProvider dateAdapter={AdapterDayjs} >
       <StaticDateTimePicker orientation="landscape"
       value={value}
       onChange={(newValue) => setValue(newValue)}
       slotProps={{
        actionBar: {
            actions:["today","accept","cancel"],
           },
         }} 
       />
       
    </LocalizationProvider>
  );
}   