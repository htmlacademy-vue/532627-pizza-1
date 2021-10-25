import { auth, loggedIn } from "@/middlewares";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Index"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    meta: {
      middlewares: [loggedIn],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("@/views/Orders"),
    meta: {
      layout: "AppLayoutSidebar",
      middlewares: [auth],
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("@/views/Cart"),
  },
];
