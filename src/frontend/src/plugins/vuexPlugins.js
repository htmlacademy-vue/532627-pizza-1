import JwtService from "@/services/jwt.service";
import Notifier from "@/plugins/notifier";
import { createResources } from "@/common/helpers";

export const vuexPlugins = (store) => {
  store.$jwt = JwtService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
};
