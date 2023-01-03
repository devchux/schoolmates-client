import React, {useState } from "react";

const AuthInput = ({
  wrapperClassName,
  hasError = false,
  type,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  if (type === "password")
    return (
      <div
        className={`auth-input-wrapper auth-password-input ${
          hasError ? "has-error" : ""
        } ${wrapperClassName || ""}`}
      >
        <input
          type={showPassword ? "text" : "password"}
          {...rest}
          autoComplete="off"
        />
        <button
          type="button"
          className="toggle-button"
          onClick={togglePassword}
        >
          {showPassword ? "HIDE" : "SHOW"}
        </button>
      </div>
    );
  return (
    <div
      className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
        wrapperClassName || ""
      }`}
    >
      <input type={type} {...rest} autoComplete="off" />
    </div>
  );
};

export default AuthInput;
