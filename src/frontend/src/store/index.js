import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

import { START_LOADING, FINISH_LOADING } from "@/store/mutation.types";
import { INIT } from "@/store/actions.types";
import { vuexPlugins } from "@/plugins";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
  },
  mutations: {
    [START_LOADING](state) {
      state.isLoading = true;
    },
    [FINISH_LOADING](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [INIT]({ commit, dispatch }) {
      commit(START_LOADING);
      dispatch("Builder/fetchBuilderData");
      setTimeout(() => commit(FINISH_LOADING), 1000);
    },
  },
  modules,
  plugins: [vuexPlugins],
});
