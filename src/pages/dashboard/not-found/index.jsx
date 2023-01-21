import React from "react";
import { useNavigate } from "react-router-dom";
import { NotFoundIcon } from "../../../assets/svgs";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <NotFoundIcon />
      <p>
        This page could not be found. It is either you do not have permission to
        view this page or you entered a url that does not exist on the platform.
      </p>
      <button onClick={() => navigate(-1)} className="btn text-primary">
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
