import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import TagsInput from "react-tagsinput";

const AuthInput = ({
  wrapperClassName,
  hasError = false,
  type,
  isPhone = false,
  isMulti = false,
  label,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  if (type === "password")
    return (
      <>
        {label && <label className="mb-2">{label}</label>}
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
      </>
    );

  if (isPhone)
    return (
      <>
        {label && <label className="mb-2">{label}</label>}
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
      </>
    );

  if (isMulti) return (
    <>
      {label && <label className="mb-2">{label}</label>}
      <div
        className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
          wrapperClassName || ""
        }`}
      >
        <TagsInput {...rest} />
      </div>
    </>
  )

  return (
    <>
      {label && <label className="mb-2">{label}</label>}
      <div
        className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
          wrapperClassName || ""
        }`}
      >
        <input type={type} {...rest} autoComplete="off" />
      </div>
    </>
  );
};

export default AuthInput;
