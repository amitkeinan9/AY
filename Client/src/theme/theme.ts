import { deepPurple } from "@mui/material/colors";
import createTheme from "@mui/material/styles/createTheme";

const palette = createTheme({
  palette: {
    primary: deepPurple,
  },
});

export const theme = createTheme(
  {
    components: {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderWidth: "2px",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            border: "2px solid",
            borderRadius: 26,
            textTransform: "none",
            fontWeight: "bold",
          },
          outlinedPrimary: {
            "&:hover": {
              borderWidth: "2px",

              borderColor: palette.palette.primary.dark,
              backgroundColor: palette.palette.primary.dark,
              color: "white",
            },
          },
          containedPrimary: {
            border: "none",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
        },
      },
    },
  },
  palette
);
