/** @jsxImportSource @emotion/react */
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";


function NotFoundPage() {
  const navigate = useNavigate();
  function goto(uri) {
    navigate(uri, { replace: true });
  }
  const { role } = useAuth();

  return (
    <Box sx={{
      textAlign: "center",
      height: "85vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Box>
        <Typography>404 Page Not Found</Typography>
        <Typography>No record found for this URL</Typography>
        <Typography sx={{ marginTop: "10px" }}></Typography>
        {role === "admin" ? <Button variant="outlined" onClick={() => { goto('/admin-dashboard') }}>Home</Button> :
          <Button variant="outlined" onClick={() => { goto('/home') }}>Home</Button>}
      </Box>
    </Box>
  );
}
export default NotFoundPage;
