import React from "react";

const Button = ({ children, className, block = false, variant, ...rest }) => {
  const getVariant = () => {
    switch (variant) {
      case "outline":
        return variant;

      case "outline-danger":
        return variant;

      case "danger":
        return variant;

      default:
        return null;
    }
  };

  return (
    <button
      className={`custom-button ${block ? "is-block" : ""} ${
        getVariant() || ""
      } ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
