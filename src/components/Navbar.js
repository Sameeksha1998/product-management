import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Avatar, Box, Drawer, List, ListItem,
  ListItemIcon, ListItemText, Button, Divider
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { addActivity, logout } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
import { Menu as MenuIcon, Dashboard, ShoppingCart, ExitToApp, Home } from "@mui/icons-material"; // Updated icon imports
import Inventory2Icon from '@mui/icons-material/Inventory2';
import StorefrontIcon from '@mui/icons-material/Storefront';


const drawerWidth = 240;

const Navbar = ({ role }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get current path

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("userData");
      dispatch(logout());  // Assuming you have a logout action

      // Delay the navigation to ensure state update happens first
      setTimeout(() => {
        navigate("/login");
      }, 10);
      dispatch(addActivity("Admin logged out"));
    } catch (error) {
      console.log("error occurs while logout", error);
    }
  };


  const menuItems = [
    ...(role === "admin"
      ? [
        { text: "Dashboard", icon: <Dashboard />, path: "/admin-dashboard" },
        { text: "Products", icon: <ShoppingCart />, path: "/products" },
        { text: "Inventory Management", icon: <Inventory2Icon />, path: "/inventory" },
        { text: "Activity", icon: <StorefrontIcon />, path: "/ActivityLogs" }
      ]
      : [
        { text: "Home", icon: <Home />, path: "/" },
        { text: "Products", icon: <ShoppingCart />, path: "/products" }
      ]
    ),
  ];


  const drawer = (
    <Box sx={{ width: drawerWidth, p: 2 }}>
      <Box sx={{ backgroundColor: "primary" }}>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          {role === "admin" ? "Admin Panel" : "User Panel"}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? "rgba(0, 0, 0, 0.1)" : "inherit",
            }}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ fontWeight: location.pathname === item.path ? "bold" : "normal" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar for large screens */}

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block", zIndex:0 },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          [`& .MuiDrawer-paper`]: { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* Navbar */}
        <AppBar position="fixed" sx={{ width: "100%", ml: { md: `${drawerWidth}px` } }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2, display: { md: "none" } }} onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
            </Typography>
            <Avatar alt={role?.toUpperCase()} src="https://via.placeholder.com/40" sx={{ marginRight: 2 }} />
            <Button color="inherit" startIcon={<ExitToApp />} onClick={handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* Spacer to prevent content from going under the AppBar */}
      </Box>
    </Box>
  );
};

export default Navbar;
