import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../../utils/auth"; // ✅ Use consistent helper

const RequireAuth = ({ allowedRoles, redirectTo = "/login", children }) => {
  const location = useLocation();
  const user = getUser(); // ✅ Now reads from ff_user

  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // wrong role
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
