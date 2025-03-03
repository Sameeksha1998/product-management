import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const Layout = ({ role }) => {
  return (
    <>
      <Navbar role={role} />
      <Box
        sx={{
          padding: "20px",
          marginLeft: { xs: "0px", md: "240px" }, // No margin on small screens, margin on larger screens
          width: { xs: "100%", md: `calc(100% - 240px)` }, // Adjust width dynamically
          transition: "margin 0.3s ease-in-out", // Smooth transition effect
        }}
      >
        {/* Adjust margin if using a sidebar */}
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
