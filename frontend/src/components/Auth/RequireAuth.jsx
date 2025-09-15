import { Navigate } from "react-router-dom";

const RequireAuth = ({ allowedRoles, redirectTo, children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  // Not logged in
  if (!token || !user) {
    return <Navigate to={redirectTo || "/login"} replace />;
  }

  // Role not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ If everything is fine, render children
  return children;
};

export default RequireAuth;
