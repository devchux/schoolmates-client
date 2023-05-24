import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIServies from "../services/api-services";

export const UserContext = createContext({});

const apiServices = new APIServies();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loginPrompt, setLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const updateUser = (data) => {
    const userStorage = localStorage.getItem("userData");
    const userData = userStorage ? JSON.parse(userStorage) : {};

    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    setUser({ ...userData, ...data });
  };

  const logout = () => {
    apiServices.eraseToken();
    setUser({});
    localStorage.clear();
    navigate("/auth");
  };

  const errorHandler = (err, message) => {
    if (err?.response?.status === 401) {
      setLoginPrompt(true);
    }
    apiServices.errorHandler(err, message);
  };

  const toggleLoginPrompt = () => setLoginPrompt(!loginPrompt);

  useEffect(() => {
    const userStorage = localStorage.getItem("userData");
    const userData = userStorage ? JSON.parse(userStorage) : null;

    if (userData) {
      updateUser(userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        logout,
        loginPrompt,
        setLoginPrompt,
        toggleLoginPrompt,
        errorHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
