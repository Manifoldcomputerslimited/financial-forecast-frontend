import { Login } from "../pages/Login";
import { Forgotpassword } from "../pages/Forgotpassword"
import Dashboard  from "../pages/Dashboard";

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
];
