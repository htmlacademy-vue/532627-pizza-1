import Vuex from "vuex";
import modules from "@/store/modules";
import { mutations } from "@/store";
import { vuexPlugins } from "@/plugins";
import {
  SET_AUTH,
  SET_USER,
  SET_BUILDER,
  RESET_CART,
  SET_ORDERS,
  SET_PHONE,
  SET_ADDRESS,
  SET_ADDRESSES,
  SET_MISC,
} from "@/store/mutation.types";
import { CREATE_CART } from "@/store/actions.types";
import user from "@/static/user.json";
import doughList from "@/static/dough.json";
import sizeList from "@/static/sizes.json";
import saucesList from "@/static/sauces.json";
import ingredients from "@/static/ingredients.json";
import misc from "@/static/misc.json";
import { getValueByName } from "@/common/helpers";
import {
  DOUGH_TYPES,
  INGREDIENT_TYPES,
  SAUCE_TYPES,
  SIZE_TYPES,
} from "@/common/constants";
import mockBuild from "@/store/mocks/static/build.json";
import addresses from "@/store/mocks/static/addresses.json";

const state = () => ({
  isLoading: false,
});

export const generateMockStore = (actions, mutations) => {
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

export const unAuthUser = (store) => {
  store.commit(`Auth/${SET_AUTH}`, false);
  store.commit(`Auth/${SET_USER}`, {});
};

export const setBuild = (store, build) => {
  store.commit(`Cart/${RESET_CART}`);
  store.commit(`Builder/${SET_BUILDER}`, {
    doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
    sizeList: sizeList.map((item) => getValueByName(item, SIZE_TYPES)),
    sauceList: saucesList.map((item) => getValueByName(item, SAUCE_TYPES)),
    ingredients: ingredients.map((item) => {
      return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
    }),
    ...build,
  });
};

export const setCart = (store, build, needCreateCart = false) => {
  setBuild(store, build);

  if (needCreateCart) {
    store.dispatch(`Cart/${CREATE_CART}`);
  }
};

export const setOrders = (store, orders) => {
  setBuild(store, mockBuild);
  store.commit(`Orders/${SET_ORDERS}`, orders);
};

export const setOrderData = (store, phone, address) => {
  store.commit(`Cart/${SET_PHONE}`, phone);
  store.commit(`Cart/${SET_ADDRESS}`, address);
};

export const setMisc = (store) => {
  store.commit(`Cart/${SET_MISC}`, misc);
};

export const setAddresses = (store) => {
  store.commit(`Addresses/${SET_ADDRESSES}`, addresses);
};
