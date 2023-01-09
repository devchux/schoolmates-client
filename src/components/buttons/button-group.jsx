import React from "react";
import Button from "./button";

const ButtonGroup = ({ options = [], wrapperClassName }) => {
  return (
    <div className={`my-3 ${wrapperClassName || ""}`}>
      {options?.map((obj, key) => (
        <Button key={key} {...obj} className="me-2">
          {obj?.title}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
