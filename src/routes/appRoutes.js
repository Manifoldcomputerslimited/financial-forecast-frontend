import { Login } from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Setting from "../pages/Setting";
import { Forgotpassword } from "../pages/Forgotpassword"

export const appRoutes = [
  {
    path: "/login",
    key: "/login",
    component: Login,
  },
  {
    path: "/forgot-password",
    key: "/forgot-password",
    component: Forgotpassword,
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
