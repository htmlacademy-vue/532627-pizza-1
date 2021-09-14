import {
  ADD_TO_CART,
  RESET_CART,
  ADD_MISC,
  DELETE_MISC,
  REMOVE_PIZZA,
  CHANGE_PIZZA_QUANTITY,
  EDIT_PIZZA,
} from "@/store/mutation-types";
import {
  CREATE_CART,
  DECREASE_PIZZA_QUANTITY,
  EDIT_CART_PIZZA,
} from "@/store/actions-types";
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
    [EDIT_PIZZA](state, pizza) {
      const currentPizza = state.cart.find(
        (pizzaItem) => pizzaItem.id === pizza.id
      );

      if (currentPizza) {
        Object.assign(currentPizza, pizza);
      }
    },
    [DELETE_MISC](state, miscId) {
      const miscItem = state.misc.find((misc) => miscId === misc.id);

      if (miscItem && miscItem.quantity > 0) {
        miscItem.quantity -= 1;
      }
    },
    [REMOVE_PIZZA](state, id) {
      state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
    },
    [CHANGE_PIZZA_QUANTITY](state, { id, quantity }) {
      state.cart = state.cart.map((cartItem) => {
        return {
          ...cartItem,
          quantity: cartItem.id === id ? quantity : cartItem.quantity,
        };
      });
    },
  },
  actions: {
    [EDIT_CART_PIZZA]({ rootGetters, commit }, { id, quantity }) {
      commit(EDIT_PIZZA, {
        id,
        quantity,
        name: rootGetters["Builder/getPizzaName"],
        dough: rootGetters["Builder/getDoughValue"],
        size: rootGetters["Builder/getSizeValue"],
        sauce: rootGetters["Builder/getSauceValue"],
        ingredients: rootGetters["Builder/checkedIngredients"],
        price: rootGetters["Builder/totalSum"],
      });

      commit("Builder/RESET_BUILDER", null, { root: true });
    },
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
    [DECREASE_PIZZA_QUANTITY]({ commit }, { id, quantity }) {
      if (quantity === 0) {
        commit(REMOVE_PIZZA, id);
      } else {
        commit(CHANGE_PIZZA_QUANTITY, { id, quantity });
      }
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
