import { Login } from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";

export const appRoutes = [
  {
    path: "/login",
    key: "/login",
    component: Login,
  },
  {
    path: "/",
    key: "/",
    component: Dashboard,
  },
  {
    path: "/user",
    key: "/user",
    component: User,
  }
];
