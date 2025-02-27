import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import AppRoutes from "./Routes";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes isAuthenticated={isAuthenticated} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
