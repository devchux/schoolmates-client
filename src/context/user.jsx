import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIServies from "../services/api-services";

export const UserContext = createContext({});

const apiServices = new APIServies();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const updateUser = (data) => {
    const userStorage = localStorage.getItem("userData");
    const userData = userStorage ? JSON.parse(userStorage) : {};

    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    setUser({ ...userData, ...data });
  };

  const logout = () => {
    // document.cookie.split(";").forEach((c) => {
    //   document.cookie = c
    //     .replace(/^ +/, "")
    //     .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    // });
    apiServices.eraseToken();
    setUser({});
    localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("userData");
    const userData = userStorage ? JSON.parse(userStorage) : null;

    if (userData) {
      updateUser(userData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
