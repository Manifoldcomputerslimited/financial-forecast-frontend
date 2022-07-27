import { Login } from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Setting from "../pages/Setting";

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
  },
  {
    path: "/setting",
    key: "/setting",
    component: Setting,
  }
];
