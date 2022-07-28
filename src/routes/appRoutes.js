import { Login } from "../pages/Login";
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
  }
];
