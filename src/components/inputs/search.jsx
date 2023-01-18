import { faRemove, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import ButtonGroup from "../buttons/button-group";
import AuthInput from "./auth-input";

const Search = ({
  onSearch,
  placeholder,
  onClear = () => null,
  isLoading = false,
  isSessionSearch = false,
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
        onChange={({ target: { value } }) => {
          if (isSessionSearch) {
            handleSessionChange(value, "text", setText);
          } else {
            setText("text", value);
          }
        }}
      />
      <ButtonGroup
        wrapperClassName="custom-search-buttons"
        options={[
          {
            isLoading,
            title: <FontAwesomeIcon icon={faSearch} />,
            onClick: () => onSearch(inputs.text),
            disabled: !inputs.text || isLoading,
          },
          {
            isLoading,
            title: <FontAwesomeIcon icon={faRemove} />,
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
