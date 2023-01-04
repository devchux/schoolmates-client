import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const GoBack = ({ onGoBack }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-5">
      <button
        type="button"
        className="btn go-back-button"
        onClick={() => (onGoBack ? onGoBack() : navigate(-1))}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Go Back
      </button>
    </div>
  );
};

export default GoBack;
