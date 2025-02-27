const initialState = {
    products: [],
  };
  
  export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_INVENTORY_SUCCESS":
        return { ...state, products: action.payload };
      case "UPDATE_STOCK_SUCCESS":
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.productId
              ? { ...product, stockQuantity: action.payload.newStock }
              : product
          ),
        };
      default:
        return state;
    }
  };
  