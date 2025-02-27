import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/authActions";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spacing, shape, typography, palette } = useTheme();

  // Handle input change
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validate = () => {
    let tempErrors = {};
    if (!credentials.username) tempErrors.username = "Username is required";
    if (!credentials.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle login
  const handleLogin = () => {
    if (!validate()) return;

    let userData = null;

    const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      userData = { role: "admin", username: "admin" };
      dispatch(login("admin"));
      navigate("/admin-dashboard");
    } else if (credentials.username === "user" && credentials.password === "user123") {
      userData = { role: "user", username: "user" };
      dispatch(login("user"));
      navigate("/home");
    } else {
      setErrors({ ...errors, password: "Invalid credentials!" });
      return;
    }

    // Store data in localStorage only if not already stored
    const existingData = localStorage.getItem("userData");
    if (!existingData || JSON.stringify(userData) !== existingData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: spacing(4),
          marginTop: spacing(8),
          textAlign: "center",
          backgroundColor: palette.background.paper,
          borderRadius: shape.borderRadius * 2, // Increased border-radius
        }}
      >
        <Typography
          color="primary"
          variant="h5"
          sx={{ marginBottom: spacing(2), fontWeight: typography.h5.fontWeight }}
        >
          Login
        </Typography>
        <Box component="form">
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: shape.borderRadius * 2, // Increased border-radius
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={credentials.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: shape.borderRadius * 2, // Increased border-radius
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: spacing(2),
              borderRadius: shape.borderRadius * 2, // Increased border-radius
              fontWeight: typography.button.fontWeight
            }}
            onClick={handleLogin}
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
