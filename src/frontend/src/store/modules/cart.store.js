import { ADD_TO_CART, RESET_CART } from "@/store/mutation-types";
import { CREATE_CART } from "@/store/actions-types";
import misc from "@/static/misc.json";

const initState = () => ({
  cart: [],
  misc: misc,
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
      return state.cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
    getMisc(state) {
      return state.misc;
    },
  },
};
