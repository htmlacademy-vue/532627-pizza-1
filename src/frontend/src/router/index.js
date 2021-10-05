import Vue from "vue";
import Router from "vue-router";
import { routes } from "@/router/routes";
import { pipeline } from "@/middlewares";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares;

  if (!middlewares?.length) {
    return next();
  }

  const context = { to, from, next, store };

  const firstIndex = 0;
  const nextIndex = 1;

  return middlewares[firstIndex]({
    ...context,
    nextMiddleware: pipeline(context, middlewares, nextIndex),
  });
});
export default router;
