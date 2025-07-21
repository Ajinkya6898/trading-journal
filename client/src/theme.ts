// theme.ts
import { createTheme } from "@mui/material/styles";

// Custom gray type
interface TypeGrayColor {
  main?: string;
  dark?: string;
  medium?: string;
  light?: string;
  lighter?: string;
  lightest?: string;
}

// Module augmentation to extend MUI theme typings
declare module "@mui/material/styles" {
  interface Palette {
    brandPrimary: Palette["primary"];
    gray: TypeGrayColor;
  }

  interface PaletteOptions {
    brandPrimary?: PaletteOptions["primary"];
    gray?: TypeGrayColor;
  }

  interface PaletteColor {
    medium?: string;
    lighter?: string;
    lightest?: string;
  }

  interface SimplePaletteColorOptions {
    medium?: string;
    lighter?: string;
    lightest?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      dark: "#007FFF",
      light: "#A1C7F8",
      main: "#3385F0",
      lighter: "#F0F3F6",
      lightest: "#F7FAFF",
    },
    secondary: {
      main: "#FF6B6B",
    },
    error: {
      main: "#CF192A",
      dark: "#A3111F",
      medium: "#ef4444",
      light: "#F7EFF0",
      lighter: "#FCF7F7",
    },
    success: {
      main: "#008447",
      dark: "#005C31",
      medium: "#22c55e",
      light: "#F2F8F7",
    },
    gray: {
      dark: "#77878F",
      medium: "#C3D3DB",
      light: "#DBE6EB",
      lighter: "#EBF2F5",
      lightest: "#FAFCFD",
    },
    background: {
      default: "#1B2122",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Plus Jakarta Sans, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default theme;
