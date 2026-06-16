
// this is for agent, buyer, farmer login authentication and authorization. not working for admin.
// src/components/guard/RequireAuth.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
import authUtils from "../../utils/auth";

const RequireAuth = ({ allowedRoles, redirectTo = "/login", children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      // Prefer local cached user (set on login) to avoid redirect loops
      const cached = authUtils.getUser();
      if (cached) {
        if (mounted) {
          setUser(cached);
          setLoading(false);
        }
        return;
      }

      const u = await getCurrentUser();
      if (mounted) {
        setUser(u);
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return null;

  if (!user) return <Navigate to={redirectTo} state={{ from: location }} replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;