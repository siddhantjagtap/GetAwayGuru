import React, { createContext, useState, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          // Token expired
          logout();
        } else {
          // Token valid
          setAuthenticated(true);
          setUser(decodedToken);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        logout(); // Token decoding failed, log out the user
      }
    }
  }, []);

  const login = (data) => {
    setAuthenticated(true);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    console.log('Token stored in localStorage:', data.token);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
 
  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
