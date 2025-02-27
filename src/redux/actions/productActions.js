import { getProducts, addProduct, deleteProduct, updateProduct } from "../../../src/components/utils/fakeData";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
  try {
    const products = await getProducts();
    dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
  } catch (error) {
    dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  // dispatch({ type: "ADD_PRODUCT_REQUEST" });
  try {
    const newProduct = await addProduct(product);
    dispatch({ type: "ADD_PRODUCT_SUCCESS", payload: newProduct });
  } catch (error) {
    dispatch({ type: "ADD_PRODUCT_FAILURE", payload: error.message });
  }
};

export const removeProduct = (id) => async (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });
  try {
    await deleteProduct(id);
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_FAILURE", payload: error.message });
  }
};

// New updateProduct action
export const modifyProduct = (product) => async (dispatch) => {
  //dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
  try {
    const updatedProduct = await updateProduct(product);
    dispatch({ type: "UPDATE_PRODUCT_SUCCESS", payload: updatedProduct });
  } catch (error) {
    dispatch({ type: "UPDATE_PRODUCT_FAILURE", payload: error.message });
  }
};