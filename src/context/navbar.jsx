import React, { createContext, useState } from "react";

export const NavbarContext = createContext({});

const NavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={{ isOpen, toggle: () => setIsOpen(!isOpen) }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarProvider;
