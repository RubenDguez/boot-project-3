import { createTheme, PaletteColor, PaletteColorOptions } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
    quaternary: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    quaternary?: PaletteColorOptions;
  }
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#698f3f' //mid green
      },
      secondary: {
        main: '#34471f' //dark green
      },
      tertiary: {
        main: '#9ac171', //light green
      },
      quaternary: {
        main: '#2e382e', //black olive
      },
      background: {
        default: '#698f3f',
        paper: '#34471f' //dark green
      },
      text: {
        primary: '#2e382e', //black olive,
        secondary: '#e7decd', //cream
      }
    },
    typography: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif"
    },
  });

export default theme;
