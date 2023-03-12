import React from "react";
import Button from "./button";

const ButtonGroup = ({ options = [], wrapperClassName, className }) => {
  return (
    <div className={`my-3 ${wrapperClassName || ""}`}>
      {options?.map(({ title, ...obj }, key) => (
        <Button key={key} {...obj} className={`me-2 ${className || ""}`}>
          {title}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
