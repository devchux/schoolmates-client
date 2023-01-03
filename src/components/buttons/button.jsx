import React from "react";

const Button = ({
  children,
  className,
  block = false,
  ...rest
}) => {
  return (
    <button
      className={`custom-button ${block ? "is-block" : ""} ${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
