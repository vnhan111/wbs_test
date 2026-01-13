import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/Store'; 

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !token) {
    console.log('PrivateRoute: You are not authenticated, please log in to use this feature', {
      from: location.pathname,
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;