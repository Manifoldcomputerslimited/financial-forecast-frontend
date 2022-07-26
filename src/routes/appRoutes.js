import { Login } from "../pages/Login";
import Dashboard  from "../pages/Dashboard";

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
];
