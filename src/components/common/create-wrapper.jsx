import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/button";

const CreateWrapper = ({ link = "/" }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-5 d-flex justify-content-end">
      <Button type="button" onClick={() => navigate(link)}>
        <FontAwesomeIcon icon={faPlusCircle} className="me-2" /> Create
      </Button>
    </div>
  );
};

export default CreateWrapper;
