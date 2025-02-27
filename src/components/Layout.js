import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const Layout = ({ role }) => {
  return (
    <>
      <Navbar role={role} />
      <Box style={{ padding: "20px", marginLeft: "240px" }}> 
        {/* Adjust margin if using a sidebar */}
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
