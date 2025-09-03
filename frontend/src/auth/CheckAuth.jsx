import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, role, children }) {
  const location = useLocation();
  console.log("LOCATION: ", location);

  // If not authenticated → always go to login page
  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to="/" replace />;
  }

  // If authenticated → always go to home page
  if (isAuthenticated && location.pathname === "/") {
    if (role === "admin" || role === "user") {
      return <Navigate to="/home" replace />;
    }
  }

  return <>{children}</>;
}

export default CheckAuth;
