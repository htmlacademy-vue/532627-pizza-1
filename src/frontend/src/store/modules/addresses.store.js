import { SET_ADDRESSES } from "@/store/mutation.types";
import { resourceTypes } from "@/common/enums";
import {
  ADD_ADDRESS,
  FETCH_ADRESSES,
  REMOVE_ADDRESS,
  UPDATE_ADDRESS,
} from "@/store/actions.types";

export default {
  namespaced: true,
  state: {
    addresses: [],
  },
  actions: {
    async [UPDATE_ADDRESS]({ commit, getters }, updatedAddress) {
      try {
        await this.$api.addresses.put(updatedAddress);
        const updatedAddressList = getters.getAddresses.map((address) => {
          return address.id === updatedAddress.id ? updatedAddress : address;
        });
        commit(SET_ADDRESSES, updatedAddressList);
      } catch {
        return false;
      }
    },
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
    async [REMOVE_ADDRESS]({ commit, getters }, addressId) {
      try {
        await this.$api.addresses.delete(addressId);
        commit(
          SET_ADDRESSES,
          getters.getAddresses.filter((item) => item.id !== addressId)
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