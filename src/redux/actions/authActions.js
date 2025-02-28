import { LOGIN, LOGOUT, ADD_ACTIVITY } from "../constant";

export const login = (role) => (dispatch) => {
  dispatch({ type: LOGIN, payload: { role } });
  dispatch(addActivity(`${role} logged in`)); // Log user login
};

export const logout = () => (dispatch) => {
  dispatch(addActivity("User logged out")); // Log user logout
  dispatch({ type: LOGOUT });
};

export const addActivity = (action) => ({
  type: ADD_ACTIVITY,
  payload: { action },
});
