import Vuex from "vuex";
import modules from "@/store/modules";
import { mutations } from "@/store";
import { vuexPlugins } from "@/plugins";
import {
  SET_AUTH,
  SET_USER,
  SET_BUILDER,
  RESET_CART,
} from "@/store/mutation.types";
import { CREATE_CART } from "@/store/actions.types";
import user from "@/static/user.json";
import doughList from "@/static/dough.json";
import sizeList from "@/static/sizes.json";
import saucesList from "@/static/sauces.json";
import ingredients from "@/static/ingredients.json";
import build from "@/store/mocks/static/build.json";
import { getValueByName } from "@/common/helpers";
import {
  DOUGH_TYPES,
  INGREDIENT_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants";

const state = () => ({
  isLoading: false,
});

export const generateMockStore = (actions) => {
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modules[module] = { ...modules[module], actions };
    });
  }

  return new Vuex.Store({
    state,
    mutations,
    modules,
    getters: modules["Builder"].getters,
    plugins: [vuexPlugins],
  });
};

export const authUser = (store) => {
  store.commit(`Auth/${SET_AUTH}`, true);
  store.commit(`Auth/${SET_USER}`, user);
};

export const setCart = (store) => {
  store.commit(`Cart/${RESET_CART}`);
  store.commit(`Builder/${SET_BUILDER}`, {
    ...build,
    doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
    sizeList: sizeList.map((item) => getValueByName(item, SIZE_TYPES)),
    sauceList: saucesList.map((item) => getValueByName(item, SAUCE_TYPES)),
    ingredients: ingredients.map((item) => {
      return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
    }),
  });
  store.dispatch(`Cart/${CREATE_CART}`);
};
