import React, { createContext, useState, useEffect } from "react";
// 1. Import the helper functions from the file you just showed me
import {
  getToken,
  setToken,
  removeToken,
  isTokenExpired,
} from "../utils/token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if token exists on load
  const existingToken = getToken();
  const [isAuthenticated, setIsAuthenticated] = useState(!!existingToken);

  // --- LOGIN FUNCTION ---
  const login = (token) => {
    // CRITICAL FIX: You must call setToken here!
    // If this line is missing, the token never gets saved to Local Storage.
    setToken(token);
    setIsAuthenticated(true);
  };

  // --- LOGOUT FUNCTION ---
  const logout = () => {
    removeToken(); // Removes 'jwtToken' from Local Storage
    setIsAuthenticated(false);
  };

  // Optional: Check expiration on load
  useEffect(() => {
    const token = getToken();
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
