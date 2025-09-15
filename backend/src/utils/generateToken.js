import jwt from "jsonwebtoken";

export const generateToken = (id, role) => {
  return jwt.sign(
    { id, role }, // payload
    process.env.JWT_SECRET,
    { expiresIn: "7d" } // token valid for 7 days
  );
};
