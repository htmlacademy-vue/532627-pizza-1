import {
  ADD_TO_CART,
  RESET_CART,
  ADD_MISC,
  DELETE_MISC,
  REMOVE_PIZZA,
  CHANGE_PIZZA_QUANTITY,
  EDIT_PIZZA,
  SET_MISC,
  SET_ADDRESS,
  SET_PHONE,
  SET_CART,
  SET_SUCCESS,
} from "@/store/mutation.types";
import {
  CREATE_CART,
  DECREASE_PIZZA_QUANTITY,
  EDIT_CART_PIZZA,
  FETCH_MISC,
  CREATE_ORDER,
  REPEAT_ORDER,
} from "@/store/actions.types";

import { resourceTypes } from "@/common/enums";
import { getSumm, mapMiscFields } from "@/common/helpers";

const initState = () => ({
  cart: [],
  misc: [],
  phone: "",
  address: {
    street: "",
    building: "",
    flat: "",
  },
  isSuccess: false,
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [SET_SUCCESS](state, payload) {
      state.isSuccess = payload;
    },
    [SET_MISC](state, misc) {
      state.misc = misc;
    },
    [SET_CART](state, cart) {
      state.cart = cart;
    },
    [ADD_TO_CART](state, product) {
      state.cart.push(product);
    },
    [RESET_CART](state) {
      Object.assign(state, { ...initState(), isSuccess: state.isSuccess });
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
    [SET_PHONE](state, phone) {
      state.phone = phone;
    },
    [SET_ADDRESS](state, address) {
      state.address = address;
    },
  },
  actions: {
    [REPEAT_ORDER]({ commit, rootGetters, getters }, orderId) {
      const copiedOrder = rootGetters["Orders/getOrderById"](orderId);

      const pizzas = copiedOrder.orderPizzas.map((item) => {
        const dough = rootGetters["Builder/getDoughList"].find(
          (it) => it.id === item.doughId
        );
        const sauce = rootGetters["Builder/getSauceList"].find(
          (it) => it.id === item.sauceId
        );
        const size = rootGetters["Builder/getSizeList"].find(
          (it) => it.id === item.sizeId
        );
        const ingredients = item.ingredients.map((it) => {
          const ingredient = rootGetters["Builder/getIngredientList"].find(
            (el) => el.id === it.ingredientId
          );
          return {
            ...ingredient,
            count: it.quantity,
          };
        });

        return {
          id: Math.floor(Math.random() * 1000),
          name: item.name,
          dough: dough.value,
          sauce: sauce.value,
          size: size.value,
          price: rootGetters["Orders/getPizzaPrice"](item),
          quantity: item.quantity,
          ingredients,
        };
      });

      const misc = getters.getMisc.map((item) => {
        const copiedMisc = copiedOrder.orderMisc?.find(
          (it) => it.miscId === item.id
        );

        if (copiedMisc) {
          return {
            ...item,
            quantity: copiedMisc.quantity,
          };
        }
        return { ...item };
      });

      commit(SET_MISC, misc);
      commit(SET_CART, pizzas);
    },

    async [CREATE_ORDER]({ state, rootState, getters, rootGetters, commit }) {
      const pizzas = getters.getCart.map((item) => ({
        name: item.name,
        sauceId: rootGetters["Builder/getSauceList"].find(
          (it) => it.value === item.sauce
        ).id,
        doughId: rootGetters["Builder/getDoughList"].find(
          (it) => it.value === item.dough
        ).id,
        sizeId: rootGetters["Builder/getSizeList"].find(
          (it) => it.value === item.size
        ).id,
        quantity: item.quantity,
        ingredients: item.ingredients.map((it) => ({
          ingredientId: it.id,
          quantity: it.count,
        })),
      }));

      const misc = getters.getMisc.reduce((acc, item) => {
        if (item.quantity > 0) {
          return [
            ...acc,
            {
              miscId: item.id,
              quantity: item.quantity,
            },
          ];
        }

        return acc;
      }, []);

      const order = {
        userId: rootState.Auth.user?.id ?? null,
        //phone: state.phone,  TODO: backend не принимает
        address: state.address,
        pizzas,
        misc,
      };

      try {
        await this.$api.orders.post(order);
        commit(SET_SUCCESS, true);
        commit(RESET_CART);
      } catch (e) {
        return false;
      }
    },

    async [FETCH_MISC]({ commit }) {
      try {
        const misc = await this.$api[resourceTypes.MISC].query();
        if (misc.length) {
          commit(SET_MISC, mapMiscFields(misc));
        }
      } catch (e) {
        console.error("Misc don't fetched");
      }
    },

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
    isValidOrderData(state) {
      return state.phone && state.address;
    },
    getPhone(state) {
      return state.phone;
    },
    getIsSuccess(state) {
      return state.isSuccess;
    },
  },
};
