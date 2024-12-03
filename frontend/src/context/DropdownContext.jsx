import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
 const [isOpen, setIsOpen] = useState(false);
 const { isAuthenticated } = useContext(AuthContext);
 useEffect(() => {
  if (!isAuthenticated) {
   setIsOpen(false);
  }
 }, [isAuthenticated]);
 return (
  <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
   {children}
  </DropdownContext.Provider>
 );
};
