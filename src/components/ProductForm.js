import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Grid, Paper, Dialog, DialogTitle, Divider } from "@mui/material";
import { createProduct, modifyProduct } from "../redux/actions/productActions";

const ProductForm = ({ editingProduct, handleClose, open, inventory = false }) => {
  const isEdit = editingProduct && Object.keys(editingProduct).length > 0;
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    stockQuantity: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProduct({})
    if (isEdit) {
      setProduct(editingProduct);
      setErrors({});
    }
  }, [editingProduct, isEdit]);

  const validate = () => {debugger
    let newErrors = {};
    if (!product.name) newErrors.name = "Product name is required";
    if (!product.price || product.price <= 0) newErrors.price = "Price must be greater than 0";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.stockQuantity || product.stockQuantity < 0)
    newErrors.stockQuantity = "Stock quantity cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));

    // Remove error once user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const
    handleSubmit = (e) => {
      e.preventDefault();
      if (!validate()) return; // Stop submission if validation fails
      // isEdit
      if (isEdit && editingProduct) {
        dispatch(modifyProduct({ ...product })); // Use modifyProduct action
        // setEditingProduct(null);
      } else {
        dispatch(createProduct({ ...product, id: Date.now().toString() })); // Use modifyProduct action
      }

      setProduct({ id: "", name: "", price: "", category: "", stockQuantity: "", description: "" });
      handleClose();
    };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ color: "primary.main", fontWeight: 'bold' }}>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
      <Divider />
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
                error={!!errors.category}
                helperText={errors.category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stockQuantity"
                type="number"
                value={product.stockQuantity}
                onChange={handleChange}
                required
                error={!!errors.stockQuantity}
                helperText={errors.stockQuantity}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                type="text"
                value={product.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-between">
              <div>
                <Button type="submit" variant="contained" sx={{ marginRight: 2 }}>
                  {isEdit ? "Update" : "Add Product"}
                </Button>
                <Button onClick={handleClose} color="secondary" variant="outlined">
                  Close
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Dialog>
  );
};

export default ProductForm;
