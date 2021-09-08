import doughList from "@/static/dough.json";
import sizes from "@/static/sizes.json";
import sauces from "@/static/sauces.json";
import ingredients from "@/static/ingredients.json";

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
  CHANGE_INGREDIENTS,
  CHANGE_PIZZA,
} from "@/store/mutation-types";

const initState = () => ({
  doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
  sizeList: sizes.map((item) => getValueByName(item, SIZE_TYPES)),
  sauceList: sauces.map((item) => getValueByName(item, SAUCE_TYPES)),
  ingredients: ingredients.map((item) => {
    return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
  }),
  dough: "light",
  size: "small",
  sauce: "tomato",
  name: "",
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
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
      Object.assign(state, initState());
    },
    [CHANGE_INGREDIENTS](state, { value, count }) {
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
      return state.ingredients.filter((ingredient) => ingredient.count > 0);
    },
    totalSum(state, getters) {
      const doughPrice = state.doughList.find(
        (item) => item.value === state.dough
      )?.price;

      const saucePrice = state.sauceList.find(
        (item) => item.value === state.sauce
      )?.price;

      const sizeMultiplier = state.sizeList.find(
        (item) => item.value === state.size
      )?.multiplier;

      const ingredientsPrice = getters.checkedIngredients.reduce(
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
