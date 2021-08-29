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
} from "@/store/mutation-types";

const initState = () => ({
  doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
  sizeList: sizes.map((item) => getValueByName(item, SIZE_TYPES)),
  sauceList: sauces.map((item) => getValueByName(item, SAUCE_TYPES)),
  ingredientList: ingredients.map((item) => {
    return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
  }),
  doughValue: "light",
  sizeValue: "small",
  sauceValue: "tomato",
  pizzaName: "",
});

export default {
  namespaced: true,
  state: initState(),
  mutations: {
    [SET_PIZZA_NAME](state, payload) {
      state.pizzaName = payload;
    },
    [SET_DOUGH](state, payload) {
      state.doughValue = payload;
    },
    [SET_SIZE](state, payload) {
      state.sizeValue = payload;
    },
    [SET_SAUCE](state, payload) {
      state.sauceValue = payload;
    },
    [RESET_BUILDER]() {
      initState();
    },
    [CHANGE_INGREDIENTS](state, payload) {

    },
  },
  actions: {},
  getters: {
    checkedIngredients(state) {
      return state.ingredientList.filter((ingredient) => ingredient.count > 0);
    },
    totalSum(state, getters) {
      const doughPrice = state.doughList.find(
        (item) => item.value === state.doughValue
      )?.price;

      const saucePrice = state.sauceList.find(
        (item) => item.value === state.sauceValue
      )?.price;

      const sizeMultiplier = state.sizeList.find(
        (item) => item.value === state.sizeValue
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
      return state.sauceList?.length > 0 && state.ingredientList?.length > 0;
    },
    isDisabledSubmit(state, getters) {
      return !(getters.checkedIngredients.length && state.pizzaName);
    },
  },
};
