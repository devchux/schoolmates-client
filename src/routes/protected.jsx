import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const Protected = ({ children }) => {
  const {
    setLoginPrompt,
    user,
    apiServices: { getToken },
  } = useAppContext();
  const [canAccess, setCanAccess] = useState(null);
  const token = getToken()

  useEffect(() => {
    if (!token) {
      if (Object.keys(user).length > 0) {
        setLoginPrompt(true);
      } else {
        setCanAccess(false);
      }
    } else {
      setCanAccess(true)
    }
  }, [user, token, setLoginPrompt]);

  if (canAccess === null) return <div />;

  if (!canAccess) return <Navigate to="/auth" replace />;

  return children;
};
export default Protected;
