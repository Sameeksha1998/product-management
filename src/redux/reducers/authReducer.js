import { LOGIN, LOGOUT, ADD_ACTIVITY } from "../constant";

const storedRole = localStorage.getItem("role");
const storedLogs = localStorage.getItem("activityLogs");

const initialState = {
  isAuthenticated: !!storedRole,
  role: storedRole || null,
  logs: storedLogs ? JSON.parse(storedLogs) : [],
};

const authReducer = (state = initialState, action) => {
  console.log(state, "...............State before action"); // Debugging

  switch (action.type) {
    case LOGIN:
      localStorage.setItem("role", action.payload.role);
      
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload.role,
      };

    case LOGOUT:
      
      localStorage.removeItem("role");
      
      return {
        ...state,
        isAuthenticated: false,
        role: null,
        logs: [], // Clear logs on logout (optional)
      };

    case ADD_ACTIVITY:
      const newLog = {
        user: state.role, // Store user role
        action: action.payload.action, // Description of activity
        timestamp: new Date().toISOString(),
      };

      const updatedLogs = [...state.logs, newLog];

      localStorage.setItem("activityLogs", JSON.stringify(updatedLogs)); // Save to localStorage

      return {
        ...state,
        logs: updatedLogs,
      };

    default:
      return state;
  }
};

export default authReducer;
