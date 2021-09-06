import {
  ADD_TO_CART,
  RESET_CART,
  ADD_MISC,
  DELETE_MISC,
} from "@/store/mutation-types";
import { CREATE_CART } from "@/store/actions-types";
import misc from "@/static/misc.json";
import { getSumm, mapMiscFields } from "@/common/helpers";

const initState = () => ({
  cart: [],
  misc: mapMiscFields(misc),
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [ADD_TO_CART](state, product) {
      state.cart.push(product);
    },
    [RESET_CART](state) {
      Object.assign(state, initState());
    },
    [ADD_MISC](state, miscId) {
      const miscItem = state.misc.find((misc) => miscId === misc.id);

      if (miscItem) {
        miscItem.quantity += 1;
      }
    },
    [DELETE_MISC](state, miscId) {
      const miscItem = state.misc.find((misc) => miscId === misc.id);

      if (miscItem && miscItem.quantity > 0) {
        miscItem.quantity -= 1;
      }
    },
  },
  actions: {
    [CREATE_CART]({ rootGetters, commit }) {
      commit(ADD_TO_CART, {
        id: Math.floor(Math.random() * 1000),
        name: rootGetters["Builder/getPizzaName"],
        dough: rootGetters["Builder/getDoughValue"],
        size: rootGetters["Builder/getSizeValue"],
        sauce: rootGetters["Builder/getSauceValue"],
        ingredients: rootGetters["Builder/checkedIngredients"],
        price: rootGetters["Builder/totalSum"],
        quantity: 1,
      });

      commit("Builder/RESET_BUILDER", null, { root: true });
    },
  },
  getters: {
    getTotal(state) {
      return getSumm(state.cart) + getSumm(state.misc);
    },
    getCart(state) {
      return state.cart;
    },
    getMisc(state) {
      return state.misc;
    },
  },
};
