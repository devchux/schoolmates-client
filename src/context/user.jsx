import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUser = (data) => {
    const userStorage = localStorage.getItem("userData");
    const userData = userStorage ? JSON.parse(userStorage) : {};

    localStorage.setItem("userData", JSON.stringify({ ...userData, ...data }));
    setUser({ ...userData, ...data });
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
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
