import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "@/store/mutation.types";
import { CREATE_NOTIFICATION } from "@/store/actions.types";
import { NOTIFICATION_TIME } from "@/common/constants";
import { getRandomInt } from "@/common/helpers";

const initState = () => ({
  notifications: [],
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [ADD_NOTIFICATION](state, { id, msg, type }) {
      if (!!msg && !!type) {
        state.notifications = [...state.notifications, { id, msg, type }];
      }
    },
    [REMOVE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
  actions: {
    [CREATE_NOTIFICATION]({ commit }, payload) {
      const notificationId = getRandomInt();
      commit(ADD_NOTIFICATION, { ...payload, id: notificationId });

      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, notificationId);
      }, NOTIFICATION_TIME);
    },
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
};
