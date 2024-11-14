import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
      secondary: {
        main: '#34471f'
      },
      background: {
        default: '#698f3f',
      },
      text: {
        primary: '#2e382e'
      }
    },
    typography: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
  });

export default theme;
