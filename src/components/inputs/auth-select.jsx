import React from "react";
import Select from "react-select";

const AuthSelect = ({
  value,
  label,
  hasError,
  wrapperClassName,
  sort = false,
  options = [],
  advanced = false,
  placeholder = "",
  noPlaceholder = false,
  ...rest
}) => {
  return (
    <>
      {label && <label className="mb-2">{label}</label>}
      {advanced ? (
        <Select
          value={value}
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
          className={`auth-input-wrapper ${sort ? "is-sort" : ""} ${
            hasError ? "has-error" : ""
          } ${wrapperClassName || ""}`}
        >
          <select {...rest} value={value} className={!value ? "no-value" : ""}>
            {!noPlaceholder && (
              <option className="disabled" value="">
                {placeholder ? placeholder : sort ? "Sort By" : "Select..."}
              </option>
            )}
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
