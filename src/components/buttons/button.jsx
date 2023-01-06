import React from "react";
import { Spinner } from "reactstrap";

const Button = ({
  children,
  className,
  block = false,
  variant,
  isLoading = false,
  ...rest
}) => {
  const getVariant = () => {
    switch (variant) {
      case "outline":
        return variant;

      case "outline-danger":
        return variant;

      case "danger":
        return variant;

      case "dark":
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
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
