import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";

const UserDashboard = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('/back.jpeg')", // Path to your background image
        backgroundSize: "cover", // Ensures the background image covers the entire area 
        backgroundPosition: "center", // Centers the background image
        backgroundAttachment: "fixed", // Makes the background fixed when scrolling (optional)
        height: "100vh", // Full viewport height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar role="user" />
      <Box sx={{ p: 3, textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          Welcome, User!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Explore your features and settings.
        </Typography>
      </Box>
    </Box>
  );
};

export default UserDashboard;
