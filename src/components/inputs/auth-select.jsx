import React from "react";
import Select from "react-select";

const AuthSelect = ({
  hasError,
  wrapperClassName,
  label,
  options = [],
  advanced = false,
  ...rest
}) => {
  return (
    <>
      {label && <label className="mb-2">{label}</label>}
      {advanced ? (
        <Select
          options={options?.map((opt) => ({
            label: opt?.title,
            value: opt?.value,
          }))}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "0.2rem solid rgba(84, 95, 125, 0.15) !important",
              fontWeight: "400",
              fontSize: "1.4rem",
              lineHeight: "1.9rem",
              color: "#545f7d",
              padding: "0 1.25rem",
              boxShadow: "none",
              height: "4.9rem",
              borderRadius: "0.5rem",
            }),
          }}
          {...rest}
        />
      ) : (
        <div
          className={`auth-input-wrapper ${hasError ? "has-error" : ""} ${
            wrapperClassName || ""
          }`}
        >
          <select {...rest}>
            <option value="">Select...</option>
            {options?.map((opt, key) => (
              <option key={key} value={opt?.value}>
                {opt?.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default AuthSelect;
