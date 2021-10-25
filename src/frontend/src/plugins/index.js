import Vue from "vue";
import Notifier from "@/plugins/notifier";
import JwtService from "@/services/jwt.service";
import store from "@/store";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $notifier: () => new Notifier(store),
        $api: () => createResources(this.$notifier),
      },
    });
  },
};

Vue.use(plugins);

export const vuexPlugins = (store) => {
  store.$jwt = JwtService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
};
