import { LOGIN, LOGOUT, GET_ME } from "@/store/actions.types";
import { SET_AUTH, SET_USER } from "@/store/mutation.types";

export default {
  namespaced: true,
  state: {
    user: null,
    isLoggedIn: false,
  },
  actions: {
    async [LOGIN]({ dispatch }, credentials) {
      try {
        const loginData = this.$api.auth.login(credentials);
        this.$jwt.saveToken();
        this.$api.auth.setAuthHeader(loginData.token);
        dispatch("getMe");
      } catch (e) {
        this.$notifier.error(e.toString());
      }
    },
    async [GET_ME]({ commit, dispatch }) {
      try {
        const userData = await this.$api.auth.getMe();
        commit(SET_AUTH, true);
        commit(SET_USER, userData);
      } catch (e) {
        this.$notifier.error(e.toString());

        setTimeout(() => {
          dispatch(LOGOUT);
        }, 2000);
      }
    },
  },
  mutations: {
    [SET_AUTH](state, payload) {
      state.isLoggedIn = payload;
    },
    [SET_USER](state, payload) {
      state.user = payload;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },
  },
};
