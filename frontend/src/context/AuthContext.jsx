import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
   setIsAuthenticated(true);
  } else setIsAuthenticated(false);
 }, []);
 const login = (token, email, name, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("role", role);
  setIsAuthenticated(true);
 };

 const logout = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
 };

 return (
  <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
   {children}
  </AuthContext.Provider>
 );
};
