import { initUser } from "@/common/helpers";

export const auth = ({ next, store, nextMiddleware }) => {
  console.log(111111);
  if (!store.getters["Auth/isLoggedIn"]) {
    const token = store.$jwt.getToken();
    if (token) {
      initUser(store);
    } else {
      next("/");
    }
  }
  return nextMiddleware();
};

export const loggedIn = ({ next, store, nextMiddleware }) => {
  if (store.$jwt.getToken()) {
    next("/");
  }

  return nextMiddleware();
};
