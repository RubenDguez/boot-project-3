import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import useAuth from "../../hooks/useAuth";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import CalendarCard from "../../components/CalendarCard/CalendarCard";
import AddEvent from "../../components/CalendarCard/AddEvent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useQuery } from '@apollo/client';
import { GET_EVENTS } from "../../utils/queries";


export default function ServiceCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(value);
  useAuth();
  const {data} = useQuery(GET_EVENTS);
  const events = data?.me.events || [];
  console.log("getevents query", events);
  
  console.log("getevents query", data);

  return (
    <Grid container spacing={2}>
      <Grid size={{lg:6,xs:12}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation={isSmallScreen ? "portrait" : "landscape"}
            openTo="day"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            sx={{
              height: "100%",
              backgroundColor: "#9AC171",
              "& .MuiSvgIcon-root": { color: "#34471F" },
              "& .MuiPickersToolbar-content": { textAlign: "center" },
            }}
            slotProps={{
              actionBar: {
                actions: ["today", "accept"],
              },
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid size={{lg:6,xs:12}}>
        <Stack spacing={1}>
          <AddEvent value={value} />
          {}
          {events.map((event: any) => {
            return (
              <CalendarCard
                key={event._id}
                title={event.eventName}
                date={event.eventDate}
                location={event.eventLocation}
              />
            );
          })}
          {/* <CalendarCard /> */}
        </Stack>
      </Grid>
    </Grid>
  );
}
