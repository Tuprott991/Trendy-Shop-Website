import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
 const [isOpen, setIsOpen] = useState(false);
 const [isQuantity, setIsQuantity] = useState(false);
 const { isAuthenticated } = useContext(AuthContext);
 useEffect(() => {
  if (!isAuthenticated) {
   setIsOpen(false);
  }
 }, [isAuthenticated]);
 //  useEffect(() => {
 //   if (isQuantity) {
 //    setIsOpen(true);
 //   }
 //  }, [isQuantity]);
 return (
  <DropdownContext.Provider
   value={{ isOpen, isQuantity, setIsOpen, setIsQuantity }}
  >
   {children}
  </DropdownContext.Provider>
 );
};
