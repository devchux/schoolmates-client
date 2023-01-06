import React from "react";
import { Navigate } from "react-router-dom";
import Helpers from "../services/helpers";

const Protected = ({ children }) => {
  const helpers = new Helpers();

  if (!helpers.getToken()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
export default Protected;
