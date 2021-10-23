import { resourceTypes } from "@/common/enums";
import { SET_ORDERS } from "@/store/mutation.types";
import { FETCH_ORDERS, REMOVE_ORDER } from "@/store/actions.types";

export default {
  namespaced: true,
  state: {
    ordersList: [],
  },
  actions: {
    async [REMOVE_ORDER]({ commit, getters }, orderId) {
      try {
        await this.$api[resourceTypes.ORDERS].delete(orderId);
        commit(
          SET_ORDERS,
          getters.getOrderList.filter((item) => item.id !== orderId)
        );
      } catch (e) {
        console.error(e);
      }
    },
    async [FETCH_ORDERS]({ commit }) {
      try {
        const orders = await this.$api[resourceTypes.ORDERS].query();
        commit(SET_ORDERS, orders);
      } catch (e) {
        console.error(e);
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
    getOrderById: (state) => (id) => {
      return state.ordersList.find((order) => order.id === id);
    },
    getPizzaPrice: (state, getters, rootState) => (pizza) => {
      const builder = rootState.Builder;

      const dough = builder.doughList.find((it) => it.id === pizza.doughId);
      const size = builder.sizeList.find((it) => it.id === pizza.sizeId);
      const sauce = builder.sauceList.find((it) => it.id === pizza.sauceId);
      const sumIngredients = pizza.ingredients.reduce((acc, item) => {
        const ingredient = builder.ingredients.find(
          (it) => it.id === item.ingredientId
        );

        acc += ingredient.price * item.quantity;
        return acc;
      }, 0);

      return (dough.price + sauce.price + sumIngredients) * size.multiplier;
    },
    getMiscPrice: (state, _, rootState) => (misc) => {
      if (!misc) {
        return 0;
      }

      const cart = rootState.Cart;

      return misc.reduce((acc, item) => {
        const miscItem = cart.misc.find((it) => it.id === item.miscId);
        acc += miscItem.price * item.quantity;
        return acc;
      }, 0);
    },
    getOrderSumm: (state, getters) => (id) => {
      const order = state.ordersList.find((item) => item.id === id);

      if (order) {
        const sumPizza = order.orderPizzas.reduce((acc, item) => {
          acc += getters.getPizzaPrice(item) * item.quantity;
          return acc;
        }, 0);

        const sumMisc = getters.getMiscPrice(order.orderMisc);
        return sumPizza + sumMisc;
      } else {
        return null;
      }
    },
  },
};
