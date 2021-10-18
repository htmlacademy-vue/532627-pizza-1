import { resourceTypes } from "@/common/enums";
import { SET_ORDERS } from "@/store/mutation.types";
import { FETCH_ORDERS } from "@/store/actions.types";

export default {
  namespaced: true,
  state: {
    ordersList: [],
  },
  actions: {
    [FETCH_ORDERS]({ commit }) {
      try {
        const orders = this.$api[resourceTypes.ORDERS].query();
        commit(SET_ORDERS, orders);
      } catch {
        return false;
      }
    },
  },
  mutations: {
    [SET_ORDERS](state, orders) {
      state.ordersList = orders;
    },
  },
  getters: {
    getOrderList(state) {
      return state.ordersList;
    },
  },
};
