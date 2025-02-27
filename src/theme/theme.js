import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#194142", // Deep Teal Green
      light: "#4f6968", // Lighter Teal Green
      dark: "#102d2d", // Darker Teal Green
      contrastText: "#ffffff", // White text for contrast
    },
    secondary: {
      main: "#cdb434", // Vibrant yello
      // light: "#ff5c73", // Lighter Red
      // dark: "#9b0016", // Darker Red
      contrastText: "#ffffff",
    },
    accent: {
      main: "#F8B400", // Warm Yellow
      light: "#ffdf69",
      dark: "#c78900",
      contrastText: "#333",
    },
    success: {
      main: "#28a745", // Success Green
      light: "#5ec75e",
      dark: "#1f7a31",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FF9800", // Warning Orange
      light: "#ffb74d",
      dark: "#f57c00",
      contrastText: "#ffffff",
    },
    error: {
      main: "#D72638", // Error Red (Same as secondary for consistency)
      light: "#ff5c73",
      dark: "#9b0016",
      contrastText: "#ffffff",
    },
    info: {
      main: "#17a2b8", // Info Blue
      light: "#5fcde4",
      dark: "#117a8b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#F5F7FA", // Light Gray Background
      paper: "#ffffff", // White Cards
    },
    text: {
      primary: "#333333", // Dark Gray Text
      secondary: "#666666", // Medium Gray
      disabled: "#999999",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#194142",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.4,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontWeight: 600,
          padding: "10px 16px",
          "&:hover": {
            opacity: 0.9,
          },
        },
        containedPrimary: {
          backgroundColor: "#194142",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#102d2d",
          },
        },
        containedSecondary: {
          backgroundColor: "#D72638",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#9b0016",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#666",
          },
          "& label.Mui-focused": {
            color: "#194142",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#194142",
            },
            "&:hover fieldset": {
              borderColor: "#102d2d",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D72638",
            },
          },
        },
      },
    },
  },
});

export default theme;
