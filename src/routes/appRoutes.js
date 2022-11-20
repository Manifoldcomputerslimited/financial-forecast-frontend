import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import User from '../pages/User';
import Setting from '../pages/Setting';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Register from '../pages/Register';
import Rate from '../pages/Rate';

export const appRoutes = [
  {
    path: '/login',
    key: '/login',
    component: Login,
  },
  {
    path: '/register/:id',
    key: '/register/:id',
    component: Register,
  },
  {
    path: '/forgot-password',
    key: '/forgot-password',
    component: ForgotPassword,
  },
  {
    path: '/reset-password/:id',
    key: '/reset-password/:id',
    component: ResetPassword,
  },
  {
    path: '/',
    key: '/',
    component: Dashboard,
  },
  {
    path: '/user',
    key: '/user',
    component: User,
  },
  {
    path: '/exchange-rates',
    key: '/exchange-rates',
    component: Rate,
  },
  {
    path: '/setting',
    key: '/setting',
    component: Setting,
  },
];
