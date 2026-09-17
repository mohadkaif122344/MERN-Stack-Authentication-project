import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedin, authChecked} = useContext(AppContext);

   if (!authChecked) {
    return null;
  }
  
  return isLoggedin ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;