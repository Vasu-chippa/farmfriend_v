// apps/frontend/src/components/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  const styles = {
    base: {
      padding: "8px 16px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease-in-out",
    },
    primary: {
      backgroundColor: "#2563eb",
      color: "white",
    },
    secondary: {
      backgroundColor: "#f3f4f6",
      color: "#111827",
      border: "1px solid #d1d5db",
    },
    danger: {
      backgroundColor: "#dc2626",
      color: "white",
    },
  };

  const combined = {
    ...styles.base,
    ...(variant === "primary"
      ? styles.primary
      : variant === "secondary"
      ? styles.secondary
      : styles.danger),
  };

  return (
    <button type={type} onClick={onClick} style={combined}>
      {children}
    </button>
  );
};

export default Button;
