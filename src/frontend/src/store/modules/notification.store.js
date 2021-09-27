import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "@/store/mutation.types";
import { CREATE_NOTIFICATION } from "@/store/actions.types";
import { NOTIFICATION_TIME } from "@/common/constants";

const initState = () => ({
  type: "",
  msg: "",
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [ADD_NOTIFICATION](state, { msg, type }) {
      if (!!msg && !!type) {
        Object.assign(state, { msg, type });
      }
    },
    [REMOVE_NOTIFICATION](state) {
      Object.assign(state, initState());
    },
  },
  actions: {
    [CREATE_NOTIFICATION]({ commit }, payload) {
      commit(ADD_NOTIFICATION, payload);

      setTimeout(() => {
        commit(REMOVE_NOTIFICATION);
      }, NOTIFICATION_TIME);
    },
  },
  getters: {
    getNotification(state) {
      return state;
    },
  },
};
