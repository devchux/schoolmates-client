import React from "react";
import Button from "./button";

const ButtonGroup = ({ options = [] }) => {
  return (
    <div className="my-3">
      {options?.map((obj, key) => (
        <Button key={key} {...obj} className="me-2">
          {obj?.title}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
