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

export default function ServiceCalendar() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(value);
  useAuth();

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
              color: "#34471F",
              "& .MuiSvgIcon-root": { color: "#34471F" }, // Change color of icons
              "& .MuiPickersToolbar-content": { textAlign: "center" },
              "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#34471F" }, // Change selected day background color
              "& .MuiPickersDay-root.Mui-selected:hover": { backgroundColor: "#34471F" }, // Change selected day hover background color
              "& .MuiPickersDay-root:hover": { backgroundColor: "#9AC171" }, // Change day hover background color
              "& .MuiPickersToolbarText-toolbarBtnSelected": { color: "#9AC171" }, // Change selected toolbar text color
              "& .MuiPickersToolbarText-toolbarBtn": { color: "#34471f " }, // Change toolbar text color
              "& .MuiPickersCalendarHeader-root": { color: "#34471f" }, // Change calendar header background and text color
              "& .MuiPickersCalendarHeader-label": { color: "#34471f " }, // Change calendar header label color
              "& .MuiPickersCalendarHeader-switchViewButton": { color: "#34471f " }, // Change calendar header switch view button color
              "& .MuiPickersClock-pin": { backgroundColor: "#34471F" }, // Change clock pin color
              "& .MuiPickersClockPointer-root": { backgroundColor: "#34471F" }, // Change clock pointer color
              "& .MuiPickersClockPointer-thumb": { borderColor: "#34471F" }, // Change clock pointer thumb color
              "& .MuiPickersClockNumber-root": { color: "#34471F" }, // Change clock number color
              "& .MuiPickersClockNumber-root.Mui-selected": { color: "#9AC171" }, // Change selected clock number color
              "& .MuiPickersClockNumber-root.Mui-selected:hover": { color: "#9AC171" }, 
              "& .MuiTypography-root": { color: "#34471F" }, // Change typography color

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
          {JSON.parse(localStorage.getItem("events") || "[]").map((event: any, index: number) => (
            <CalendarCard 
            key={index} 
            title={event.eventName}
            date={event.eventTime}
            details={event.eventDetails}
            location={event.eventLocation}
            />
          ))}
          {/* <CalendarCard /> */}
        </Stack>
      </Grid>
    </Grid>
  );
}
