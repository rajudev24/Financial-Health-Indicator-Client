/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("UserId");
  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
