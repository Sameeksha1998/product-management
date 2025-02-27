import React from "react";
import { Dialog, DialogTitle, Divider, Paper, Grid, Typography, Button } from "@mui/material";

const ProductView = ({ product, handleClose, open }) => {
  if (!product) return null;

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle sx={{ color: "primary.main", fontWeight: "bold" }}>Product Details</DialogTitle>
      <Divider />
      <Paper sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" color="primary">
              {product.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Price:</strong> ${product.price}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Category:</strong> {product.category}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Stock Quantity:</strong> {product.stockQuantity}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Description:</strong> {product.description || "No description available"}
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} color="secondary" variant="outlined">
              Close
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ProductView;
