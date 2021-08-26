import Vue from "vue";
import Vuex from "vuex";

import builder from "./modules/builder.store";
import cart from "./modules/cart.store";
import orders from "./modules/orders.store";
import auth from "./modules/auth.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    builder,
    cart,
    orders,
    auth,
  },
});
