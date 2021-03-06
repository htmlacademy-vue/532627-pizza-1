import { resourceTypes } from "@/common/enums";

import {
  DOUGH_TYPES,
  SIZE_TYPES,
  SAUCE_TYPES,
  INGREDIENT_TYPES,
} from "@/common/constants";

import { getValueByName } from "@/common/helpers";

import {
  SET_PIZZA_NAME,
  SET_DOUGH,
  SET_SAUCE,
  SET_SIZE,
  RESET_BUILDER,
  SET_INGREDIENTS,
  CHANGE_PIZZA,
  SET_BUILDER,
} from "@/store/mutation.types";
import {
  FETCH_BUILDER_DATA,
  CHANGE_DOUGH,
  CHANGE_SIZE,
  CHANGE_NAME,
  CHANGE_INGREDIENTS,
  CHANGE_SAUCE,
  EDIT_PIZZA,
} from "@/store/actions.types";

const initState = () => ({
  id: 0,
  quantity: 0,
  doughList: [],
  sizeList: [],
  sauceList: [],
  ingredients: [],
  dough: "light",
  size: "small",
  sauce: "tomato",
  name: "",
});

export default {
  namespaced: true,
  state: initState(),
  actions: {
    [CHANGE_SAUCE]({ commit }, payload) {
      commit(SET_SAUCE, payload);
    },
    [CHANGE_INGREDIENTS]({ commit }, payload) {
      commit(SET_INGREDIENTS, payload);
    },
    [CHANGE_NAME]({ commit }, name) {
      commit(SET_PIZZA_NAME, name);
    },
    [CHANGE_DOUGH]({ commit }, dough) {
      commit(SET_DOUGH, dough);
    },
    [CHANGE_SIZE]({ commit }, size) {
      commit(SET_SIZE, size);
    },
    [EDIT_PIZZA]({ commit }, pizza) {
      commit(CHANGE_PIZZA, pizza);
    },
    async [FETCH_BUILDER_DATA]({ commit }) {
      try {
        const [doughList, ingredients, saucesList, sizeList] =
          await Promise.all([
            this.$api[resourceTypes.DOUGH].query(),
            this.$api[resourceTypes.INGREDIENTS].query(),
            this.$api[resourceTypes.SAUCES].query(),
            this.$api[resourceTypes.SIZES].query(),
          ]);

        commit(SET_BUILDER, {
          doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
          sizeList: sizeList.map((item) => getValueByName(item, SIZE_TYPES)),
          sauceList: saucesList.map((item) =>
            getValueByName(item, SAUCE_TYPES)
          ),
          ingredients: ingredients.map((item) => {
            return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
          }),
        });
      } catch (e) {
        this.$notifier.error(e.toString());
      }
    },
  },
  mutations: {
    [SET_BUILDER](state, payload) {
      Object.assign(state, payload);
    },

    [SET_PIZZA_NAME](state, payload) {
      state.name = payload;
    },
    [SET_DOUGH](state, payload) {
      state.dough = payload;
    },
    [SET_SIZE](state, payload) {
      state.size = payload;
    },
    [SET_SAUCE](state, payload) {
      state.sauce = payload;
    },
    [RESET_BUILDER](state) {
      state.name = "";
      state.id = 0;
      state.quantity = 0;
      state.dough = "light";
      state.size = "small";
      state.sauce = "tomato";
      state.ingredients = state.ingredients.map((item) => {
        return { ...item, count: 0 };
      });
    },
    [SET_INGREDIENTS](state, { value, count }) {
      const currentIngredient = state.ingredients.find(
        (ingredient) => ingredient.value === value
      );

      if (currentIngredient) {
        currentIngredient.count = count;
      }
    },
    [CHANGE_PIZZA](state, payload) {
      const ingredients = state.ingredients.map((ingredient) => {
        return {
          ...ingredient,
          count: payload.ingredients.find(
            (item) => item.value === ingredient.value
          )?.count,
        };
      });
      Object.assign(state, { ...payload, ingredients });
    },
  },
  getters: {
    checkedIngredients(state) {
      return (
        state.ingredients?.filter((ingredient) => ingredient.count > 0) ?? []
      );
    },
    totalSum(state, getters) {
      const doughPrice =
        state.doughList?.find((item) => item.value === state.dough)?.price ?? 0;

      const saucePrice =
        state.sauceList?.find((item) => item.value === state.sauce)?.price ?? 0;

      const sizeMultiplier =
        state.sizeList?.find((item) => item.value === state.size)?.multiplier ??
        0;

      const ingredientsPrice = getters.checkedIngredients?.reduce(
        (acc, item) => {
          acc += item.count * item.price;
          return acc;
        },
        0
      );

      return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
    },
    isShowIngredientsBuilder(state) {
      return state.sauceList?.length > 0 && state.ingredients?.length > 0;
    },
    isDisabledSubmit(state, getters) {
      return !(getters.checkedIngredients.length && state.name);
    },
    getId(state) {
      return state.id;
    },
    getQuantity(state) {
      return state.quantity;
    },
    getDoughList(state) {
      return state.doughList;
    },
    getDoughValue(state) {
      return state.dough;
    },
    getSizeList(state) {
      return state.sizeList;
    },
    getSizeValue(state) {
      return state.size;
    },
    getSauceList(state) {
      return state.sauceList;
    },
    getSauceValue(state) {
      return state.sauce;
    },
    getIngredientList(state) {
      return state.ingredients;
    },
    getPizzaName(state) {
      return state.name;
    },
  },
};
