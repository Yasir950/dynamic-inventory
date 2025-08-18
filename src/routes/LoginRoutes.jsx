import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import LoginComponent from 'auth/login';
import { Navigate } from 'react-router';

// render - login
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <LoginComponent />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
  { path: '*',  element:<Navigate to="/" />}
  ]
};

export default LoginRoutes;
