import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gray: Palette["primary"];
  }
  interface PaletteOptions {
    gray?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    gray: true;
  }
}
