import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";

const Guard = ({ children, routeName, action = [] }) => {
  const { permission, user } = useAppContext(routeName);
  const [canAccess, setCanAccess] = useState(null);

  const isPermitted = () => {
    let x = true;

    if (!permission || Object.keys(permission).length === 0) return false;

    if (action) {
      if (action.length > 0) {
        action?.forEach((str) => {
          if (!permission[str]) {
            x = false;
          }
        });
      }
    }

    return x;
  };

  useEffect(() => {
    const permitted = isPermitted();
    if (Object.keys(user).length > 0) setCanAccess(permitted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeName, permission]);

  if (canAccess === null) return <div />;

  if (!canAccess) return <Navigate to="/app/not-found" replace />;

  return children;
};

export default Guard;
