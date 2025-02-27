export const fetchInventory = () => async (dispatch) => {
    const response = await fetch("/api/inventory"); // Replace with actual API
    const data = await response.json();
    dispatch({ type: "FETCH_INVENTORY_SUCCESS", payload: data });
  };
  
  export const updateStock = (productId, newStock) => async (dispatch) => {
    await fetch(`/api/inventory/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ stockQuantity: newStock }),
      headers: { "Content-Type": "application/json" },
    });
  
    dispatch({ type: "UPDATE_STOCK_SUCCESS", payload: { productId, newStock } });
  };
  