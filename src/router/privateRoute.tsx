import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../app/hooks';

export const PrivateRoute = () => {
  return (
    useAuth().isAuth ? <Outlet /> : <Navigate to="login" />
  );
};
