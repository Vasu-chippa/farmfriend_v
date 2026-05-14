// apps/backend/src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * protect middleware:
 * - verifies token
 * - sets req.user = { _id, id, role } (normalized)
 */
export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const userId = decoded._id || decoded.id || decoded.userId || decoded.uid;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(401).json({ message: "User not found, authorization denied" });
    }

    // normalized user object: always provide _id
    req.user = {
      ...decoded,
      _id: userId,
      role: user.role, // fresh role from db
    };

    next();
  } catch (error) {
    console.error("Auth protect error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

// restrict roles
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied: insufficient role" });
  }
  next();
};
