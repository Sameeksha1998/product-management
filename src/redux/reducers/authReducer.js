import { LOGIN, LOGOUT } from "../constant";

const storedRole = localStorage.getItem("role");

const initialState = {
  isAuthenticated: !!storedRole,
  role: storedRole || null,
  logs: (() => {
    try {
      // Safely parse logs from localStorage
      const logs = JSON.parse(localStorage.getItem('activityLogs'));
      return Array.isArray(logs) ? logs : []; // Ensure it's always an array
    } catch (error) {
      console.error('Error parsing activity logs from localStorage:', error);
      return []; // Return an empty array if an error occurs
    }
  })(),
};

const authReducer = (state = initialState, action) => {
  console.log(state, "...............State before action"); // Debugging

  switch (action.type) {
    case LOGIN:
      localStorage.setItem("role", action.payload);
      
      // Preserve the logs in localStorage and state after login
      const logs = JSON.parse(localStorage.getItem('activityLogs')) || [];
      
      return {
        ...state,
        isAuthenticated: true,
        role: action.payload,
        logs:logs, // Ensure logs are retained after login
      };

    case LOGOUT:
      localStorage.removeItem("role");
      
      // Clear logs from state when logging out (optional)
      return { 
        ...state, 
        isAuthenticated: false, 
        role: null,
        logs: [] // or state.logs to keep logs on logout
      };
    default:
      return state;
  }
};

export default authReducer;
