import { useSelector } from "react-redux";

const useAuth = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  return { isAuthenticated, role: role?.role }; // Return role.role to make it easier to use in components
};

export default useAuth;
