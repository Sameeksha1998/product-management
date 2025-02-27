import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import { inventoryReducer } from "./inventoryReducer";

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  inventory: inventoryReducer,

});

export default rootReducer;