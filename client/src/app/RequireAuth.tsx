import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function getToken(): string | null {
  return localStorage.getItem('dict:token') ?? sessionStorage.getItem('dict:token');
}

export function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!getToken()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return <>{children}</>;
}
