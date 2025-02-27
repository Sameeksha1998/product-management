import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  TableSortLabel,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  TablePagination,
  styled,
  useTheme,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { fetchProducts, removeProduct } from "../redux/actions/productActions.js";
import ProductForm from "./ProductForm.js";
import ProductView from "./ProductView.js";
import Notification from "./Notification.js";
import useDebounce from "../hooks/useDebounce.js";
import useAuth from "../hooks/useAuth.js";

const ProductTable = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [editProduct, setEditProduct] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const { shape} = useTheme();
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    id: ""
  });
  const { role } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const debouncedFilter = useDebounce(filter, 500); // Debounce delay set to 500ms

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setView(true);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteConfirm = (id) => {
    dispatch(removeProduct(id));
  };

  const handleDeleteClick = (id) => {
    setModal({
      open: true,
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this item?",
      id: id
    });
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleAddProduct = () => {
    setEditProduct({});
    setOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const BoldPrimaryCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.primary.main,
  }));

  // Apply filtering and sorting before pagination
  const filteredSortedProducts = products
    .filter((p) => p.name.toLowerCase().includes(debouncedFilter)) // Use debounced value
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  // Get paginated data
  const paginatedProducts = filteredSortedProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>

        <CircularProgress />
      </Box>)
  } 
  // Handle errors gracefully
  else if (error) {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}>

        <Typography color="error">Error: {error}</Typography>
      </Box>)
  } 
  else {
    return (
      <Paper sx={{ padding: 3, sm: { width: "100%", height: "100vh" } }}>
        <Typography variant="h6">Product Management</Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" margin={2}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: shape.borderRadius * 2,
              },
              width: "60%"
            }}
            label="Search by Name"
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
          {role === "admin" && (
            <Button type="button" variant="contained" color="primary" onClick={handleAddProduct}>
              <Add /> Add Product
            </Button>
          )}
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <BoldPrimaryCell>Name</BoldPrimaryCell>
              <BoldPrimaryCell>
                <TableSortLabel active direction={sortOrder} onClick={handleSort}>
                  Price
                </TableSortLabel>
              </BoldPrimaryCell>
              <BoldPrimaryCell>Category</BoldPrimaryCell>
              <BoldPrimaryCell>Stock</BoldPrimaryCell>
              <BoldPrimaryCell>Actions</BoldPrimaryCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Tooltip title={<Typography>{p.description}</Typography>} placement="top">
                    {p.name}
                  </Tooltip>
                </TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.category}</TableCell>
                {/* Show a warning if stock is 0 */}
                <TableCell>
                  {p.stockQuantity <= 0 ? (
                    <Typography color="error">Out of Stock</Typography>
                  ) : (
                    p.stockQuantity
                  )}
                </TableCell>

                <TableCell>
                  <Tooltip title="View Product">
                    <IconButton sx={{ color: "primary.main" }} onClick={() => handleViewClick(p)}>
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                  {role === "admin" && (
                    <>
                      <Tooltip title="Edit Product">
                        <IconButton sx={{ color: "primary.main" }} onClick={() => { setOpen(true); setEditProduct(p) }}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product">
                        <IconButton sx={{ color: "secondary.main" }} color="error" onClick={() => handleDeleteClick(p.id)}>
                          <Delete />
                        </IconButton>
                      </Tooltip></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={filteredSortedProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <ProductForm editingProduct={editProduct} open={open} handleClose={() => setOpen(false)} />
        {selectedProduct && (<ProductView product={selectedProduct} open={view} handleClose={() => setView(false)} />)}
        <Notification
          open={modal.open}
          title={modal.title}
          message={modal.message}
          id={modal.id}
          onConfirm={handleDeleteConfirm}
          onClose={() => setModal({ ...modal, open: false })}
        />

      </Paper>
    );
  }
}

export default ProductTable;
