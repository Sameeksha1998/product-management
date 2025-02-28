import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ProductList from "./components/ProductList";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout"; // Import Layout
import InventoryPage from "./components/InventoryPage";
import useAuth from "./hooks/useAuth";
import AdminActivity from "./components/Adminactivity";

const AppRoutes = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isAuthenticated ? <Navigate to={role === "admin" ? "/admin-dashboard" : "/home"} /> : <Login />} />

      {/* Routes with Navbar */}
      <Route element={<Layout role={role} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/inventory" element={<ProtectedRoute roleRequired="admin"><InventoryPage /></ProtectedRoute>} />
        <Route path="/ActivityLogs" element={<ProtectedRoute roleRequired="admin"><AdminActivity /></ProtectedRoute>} />

      </Route>

      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
