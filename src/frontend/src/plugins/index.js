import Vue from "vue";
import Notifier from "@/plugins/notifier";
import JwtService from "@/services/jwt.service";
import store from "@/store";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JwtService,
        $notifier: () => new Notifier(store),
      },
    });
  },
};

Vue.use(plugins);

export const vuexPlugins = (store) => {
  store.$jwt = JwtService;
  store.$notifier = new Notifier(store);
};
