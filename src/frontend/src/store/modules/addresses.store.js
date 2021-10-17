import { SET_ADDRESSES } from "@/store/mutation.types";
import { resourceTypes } from "@/common/enums";
import {
  ADD_ADDRESS,
  FETCH_ADRESSES,
  REMOVE_ADDRESS,
} from "@/store/actions.types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async [FETCH_ADRESSES]({ commit }) {
      try {
        const addresses = await this.$api[resourceTypes.ADDRESSES].query();
        commit(SET_ADDRESSES, addresses ?? []);
      } catch {
        return false;
      }
    },
    async [ADD_ADDRESS]({ commit, getters }, address) {
      try {
        const newAddress = await this.$api.addresses.post(address);
        commit(SET_ADDRESSES, [...getters.getAddresses, newAddress]);
      } catch (e) {
        return false;
      }
    },
    async [REMOVE_ADDRESS]({ commit, getters }, address) {
      try {
        await this.$api.addresses.delete(address);
        commit(
          SET_ADDRESSES,
          getters.getAddresses.filter((item) => item.id !== address.id)
        );
      } catch (e) {
        return false;
      }
    },
  },
  mutations: {
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses;
    },
  },
  getters: {
    getAddresses(state) {
      return state.addresses;
    },
    getAddress(state, id) {
      return state.addresses.find((address) => address.id === id);
    },
  },
};
