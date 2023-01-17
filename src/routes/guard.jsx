import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const Guard = ({ children, routeName, action = [] }) => {
  const { permission } = useAppContext(routeName);
  const [canAccess, setCanAccess] = useState(true);

  const isPermitted = () => {
    let x = true;

    if (Object.keys(permission).length === 0) return false;

    action?.forEach((str) => {
      if (!permission[str]) {
        x = false;
      }
    });

    return x;
  };

  useEffect(() => {
    setCanAccess(isPermitted());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!canAccess) return <Navigate to="/app" replace />;

  return children;
};

export default Guard;
