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
        const loginData = await this.$api.auth.login(credentials);

        if (loginData?.token) {
          this.$jwt.saveToken(loginData.token);
          this.$api.auth.setAuthHeader(loginData.token);
          dispatch(GET_ME);
        } else {
          this.$notifier.error("Токен не получен");
        }
      } catch (e) {
        return false;
      }
    },
    async [GET_ME]({ commit, dispatch }) {
      try {
        const userData = await this.$api.auth.getMe();
        console.log(111, userData);
        commit(SET_AUTH, true);
        commit(SET_USER, userData);
      } catch (e) {
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
