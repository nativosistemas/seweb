import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('token');
  
  if (!authToken) {
    // Redirige al login si no está autenticado
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default PrivateRoute;