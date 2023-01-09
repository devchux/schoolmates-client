import React, { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import ButtonGroup from "../buttons/button-group";
import AuthInput from "./auth-input";

const Search = ({
  onSearch,
  placeholder,
  onClear = () => null,
  isLoading = false,
}) => {
  const [inputs, setinputs] = useState({ text: "" });
  const {
    apiServices: { handleSessionChange },
  } = useAppContext();

  const setText = (name, value) => {
    setinputs({ ...inputs, [name]: value });
  };

  return (
    <div className="custom-search">
      <AuthInput
        wrapperClassName="custom-search-input"
        placeholder={placeholder}
        value={inputs.text}
        onChange={({ target: { value } }) =>
          handleSessionChange(value, "text", setText)
        }
      />
      <ButtonGroup
        wrapperClassName="custom-search-buttons"
        options={[
          {
            isLoading,
            title: "Search",
            onClick: () => onSearch(inputs.text),
            disabled: !inputs.text || isLoading,
          },
          {
            isLoading,
            title: "Clear",
            variant: "dark",
            onClick: () => {
              setText("text", "");
              onClear();
            },
            disabled: !inputs.text || isLoading,
          },
        ]}
      />
    </div>
  );
};

export default Search;
