import React from "react";

const AuthSelect = ({ hasError, wrapperClassName, options = [], ...rest }) => {
  return (
    <div
      className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
        wrapperClassName || ""
      }`}
    >
      <select {...rest}>
        {options.map((opt, key) => (
          <option key={key} value={opt?.value}>
            {opt?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthSelect;
