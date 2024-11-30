import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 useEffect(() => {
  if (localStorage.getItem("token")) {
   setIsAuthenticated(true);
  } else setIsAuthenticated(false);
 }, []);
 const login = () => setIsAuthenticated(true);
 const logout = () => setIsAuthenticated(false);
 return (
  <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
   {children}
  </AuthContext.Provider>
 );
};
