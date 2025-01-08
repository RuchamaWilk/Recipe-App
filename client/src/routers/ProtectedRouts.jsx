//client/src/routs/ProtectedRouts.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedTypes }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    if (!allowedTypes.includes(decoded.type)) {
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error('Invalid token:', err);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
