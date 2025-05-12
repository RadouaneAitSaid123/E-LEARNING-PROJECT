import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on page load
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      setCurrentUser(JSON.parse(user));
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Note: token should be set by the registration/login handlers
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Add these computed properties
  const isAuthenticated = !!currentUser;
  const isProfessor = currentUser?.role === 'PROFESSOR';
  const isStudent = currentUser?.role === 'STUDENT';

  const value = {
    currentUser,
    login,
    logout,
    isAuthenticated,
    isProfessor,
    isStudent,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}