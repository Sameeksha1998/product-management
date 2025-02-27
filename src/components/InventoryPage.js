import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, IconButton, Tooltip, Box, CircularProgress, Badge, TablePagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InventoryForm from "./InventoryForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { Delete } from "@mui/icons-material";
import { STORAGE_KEY } from "./utils/fakeData";

const InventoryPage = () => {
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEditClick = (product) => {
    setOpen(true);
    setEditProduct(product);
  };

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete all products from localStorage
 const deleteAll = async () => {
  try {
    // Clear all products from localStorage
    localStorage.removeItem(STORAGE_KEY);

    console.log("All products have been deleted from localStorage.");
    dispatch(fetchProducts());
    return true; // Return a confirmation that all products have been deleted
  } catch (error) {
    console.error("Error deleting all products:", error); // Catch and log any errors
    throw error; // Throw the error so it can be handled elsewhere if needed
  }

};

  return (
    <Paper sx={{ padding: 3, sm: { width: "100%", height: "100vh" } }}>
      <Box display={"flex"} justifyContent={"space-between"} >
        <Typography variant="h6" p={3}>
          Inventory Management
        </Typography>

        <Tooltip title="Delete All">
          <IconButton sx={{ color: "error" }} color="error" onClick={deleteAll}>
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><b>Product</b></TableCell>
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Stock</b></TableCell>
                <TableCell><b>Price ($)</b></TableCell>
                <TableCell><b>Total Price ($)</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow key={product.id} sx={{ backgroundColor: (product.stockQuantity === "0" || product.stockQuantity === 0) ? "#ffebee" : "inherit" }}>
                  <TableCell>  <Badge
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    badgeContent={product.stockQuantity < 5 ? product.stockQuantity : null}
                    color="warning"
                  >
                    {product.name}
                  </Badge>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Tooltip title={product.description}>
                      <span>{product.description}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    {product.stockQuantity}
                  </TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>${(product.price * product.stockQuantity).toFixed(2)}</TableCell>
                  <TableCell>
                    <Tooltip title="Manage Inventory">
                      <IconButton color="primary" onClick={() => handleEditClick(product)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <TablePagination
            component="div"
            count={products.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      {/* Inventory Edit Dialog */}
      {editProduct && (
        <InventoryForm editingProduct={editProduct} open={open} handleClose={() => setOpen(false)} />
      )}
    </Paper>
  );
};

export default InventoryPage;
