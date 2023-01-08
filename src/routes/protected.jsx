import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const Protected = ({ children }) => {
  const {
    apiServices: { getToken },
  } = useAppContext();

  if (!getToken()) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
export default Protected;
