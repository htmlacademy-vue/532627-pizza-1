import { ADD_TO_CART } from "@/store/mutation-types";
import { CREATE_CART} from "@/store/actions-types";

const initState = () => ({
  cart: [],
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [ADD_TO_CART](state, product) {
      state.cart.push(product);
    },
  },
  actions: {
    [CREATE_CART]({ commit }) {
      commit("Builder/RESET_BUILDER", null, { root: true });
    },
  },
};
