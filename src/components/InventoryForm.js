import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    Dialog,
    DialogTitle,
    Divider,
    Box,
} from "@mui/material";
import { createProduct, modifyProduct } from "../redux/actions/productActions";
import { addActivity } from "../redux/actions/authActions";

const InventoryForm = ({ editingProduct, handleClose, open }) => {
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
        if (isEdit) {
            setProduct(editingProduct);
            setErrors({});
        } else {
            setProduct({
                id: "",
                name: "",
                price: "",
                category: "",
                stockQuantity: "",
                description: "",
            });
        }
    }, [editingProduct, isEdit]);

    const validate = () => {
        let newErrors = {};
        if (!product.name) newErrors.name = "Product name is required";
        if (!product.price || product.price <= 0) newErrors.price = "Price must be greater than 0";
        if (product.stockQuantity < 0)
            newErrors.stockQuantity = "Stock quantity cannot be negative";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stockQuantity" ? Number(value) : value,
        }));

        // Remove error once user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (!validate()) return;

            if (isEdit) {
                dispatch(modifyProduct({ ...product }));
            } else {
                dispatch(createProduct({ ...product, id: Date.now().toString() }));
            }
            dispatch(addActivity(`Product added: ${product.name} (ID: ${product.id})`));
        } catch (error) {
            console.log("error occurs while product adding", error);
        } finally {
            handleClose();
        }
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ color: "primary.main", fontWeight: "bold" }}>
                {isEdit ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <Divider />
            <Paper sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography color="primary" variant="h5" mb={1}>
                                    {product.name || "New Product"}
                                </Typography>
                                <Typography color="secondary" variant="h6" fontWeight="bold">
                                    Total Amount: ${product.stockQuantity * product.price || 0}
                                </Typography>
                            </Box>
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
                        <Grid item xs={12} display="flex" justifyContent="space-between">
                            <div>
                                <Button type="submit" variant="contained" sx={{ marginRight: 2 }}>
                                    Save
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

export default InventoryForm;
