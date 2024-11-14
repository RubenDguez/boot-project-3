import * as React from 'react';
import dayjs, { Dayjs, locale } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
export default function Calendar() {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    console.log(value);
    
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