import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [isLoginSuccess, setIsLoginSuccess] = useState(false);
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
  setIsLoginSuccess(true);
  setIsAuthenticated(true);
 };

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  setIsLoginSuccess(false);
  setIsAuthenticated(false);
 };

 return (
  <AuthContext.Provider
   value={{ isLoginSuccess, isAuthenticated, login, logout, setIsLoginSuccess }}
  >
   {children}
  </AuthContext.Provider>
 );
};
