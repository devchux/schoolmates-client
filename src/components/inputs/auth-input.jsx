import React, { forwardRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import TagsInput from "react-tagsinput";

const AuthInput = forwardRef(
  (
    {
      wrapperClassName,
      hasError = false,
      type,
      isPhone = false,
      isMulti = false,
      label,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    if (type === "password")
      return (
        <>
          {label && <label className="mb-2">{label}</label>}
          <div
            className={`auth-input-wrapper auth-password-input ${
              hasError ? "has-error" : ""
            } ${rest?.disabled ? 'disabled' : ''} ${wrapperClassName || ""}`}
          >
            <input
              type={showPassword ? "text" : "password"}
              {...rest}
              ref={ref}
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
            className={`auth-input-wrapper is-phone ${rest.disabled ? 'disabled' : ''} ${
              hasError ? "has-error" : ""
            } ${wrapperClassName || ""}`}
          >
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              flags={flags}
              ref={ref}
              defaultCountry="NG"
              {...rest}
            />
          </div>
        </>
      );

    if (isMulti)
      return (
        <>
          {label && <label className="mb-2">{label}</label>}
          <div
            className={`auth-input-wrapper ${rest.disabled ? 'disabled' : ''} ${hasError ? "has-error" : ""} ${
              wrapperClassName || ""
            }`}
          >
            <TagsInput {...rest} ref={ref} />
          </div>
        </>
      );

    return (
      <>
        {label && <label className="mb-2">{label}</label>}
        <div
          className={`auth-input-wrapper ${rest.disabled ? 'disabled' : ''} ${hasError ? "has-error" : ""} ${
            wrapperClassName || ""
          }`}
        >
          <input type={type} ref={ref} {...rest} autoComplete="off" />
        </div>
      </>
    );
  }
);

export default AuthInput;
