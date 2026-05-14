import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../utils/auth";

const RequireAuth = ({ allowedRoles, redirectTo = "/login", children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await fetchCurrentUser();
      if (mounted) {
        setUser(u);
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return null;

  if (!user) return <Navigate to={redirectTo} replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
