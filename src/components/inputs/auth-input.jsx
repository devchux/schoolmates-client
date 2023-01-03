import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

const AuthInput = ({
  wrapperClassName,
  hasError = false,
  type,
  isPhone = false,
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

  if (isPhone)
    return (
      <div
        className={`auth-input-wrapper is-phone ${
          hasError ? "has-error" : ""
        } ${wrapperClassName || ""}`}
      >
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          flags={flags}
          defaultCountry="NG"
          {...rest}
        />
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
