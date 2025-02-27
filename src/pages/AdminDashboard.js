import React from "react";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";
import SalesAnalytics from "../components/SalesAnalytics";

const AdminDashboard = () => {
  return (
    <Box>
      <Navbar role="admin" />
      <Box sx={{ p: 3, mt: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold">
          Welcome, Admin!
        </Typography>
        <SalesAnalytics/>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
