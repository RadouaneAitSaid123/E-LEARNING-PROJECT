import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Composant pour les routes qui nécessitent une authentification
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

// Composant pour les routes accessibles uniquement aux professeurs
export const ProfessorRoute = () => {
  const { isProfessor, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return isProfessor ? <Outlet /> : <Navigate to="/" />;
};

// Composant pour les routes accessibles uniquement aux étudiants
export const StudentRoute = () => {
  const { isStudent, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  return isStudent ? <Outlet /> : <Navigate to="/" />;
};