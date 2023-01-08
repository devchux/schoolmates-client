import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ImagePreview = ({ wrapperClassName, centered = false, src, reset }) => {
  return (
    <div
      className={`custom-image-preview ${centered ? "mx-auto" : ""} ${
        wrapperClassName || ""
      }`}
    >
      {src ? (
        <>
          <button type="button" className="btn reset-btn" onClick={reset}>
            <FontAwesomeIcon icon={faClose} />
          </button>
          <img src={src} alt="preview" />
        </>
      ) : (
        <p>File Preview</p>
      )}
    </div>
  );
};

export default ImagePreview;
