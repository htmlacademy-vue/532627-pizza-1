import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

import { vuexPlugins } from "@/plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [vuexPlugins],
});
