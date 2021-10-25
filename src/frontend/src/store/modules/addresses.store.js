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
        this.$notifier.success("Адрес успешно изменён");
      } catch (e) {
        console.error(e);
      }
    },
    async [FETCH_ADRESSES]({ commit }) {
      try {
        const addresses = await this.$api[resourceTypes.ADDRESSES].query();
        commit(SET_ADDRESSES, addresses ?? []);
      } catch (e) {
        console.error(e);
      }
    },
    async [ADD_ADDRESS]({ commit, getters }, address) {
      try {
        const newAddress = await this.$api.addresses.post(address);
        commit(SET_ADDRESSES, [...getters.getAddresses, newAddress]);
        this.$notifier.success("Адрес успешно добавлен");
      } catch (e) {
        console.error(e);
      }
    },
    async [REMOVE_ADDRESS]({ commit, getters }, addressId) {
      try {
        await this.$api.addresses.delete(addressId);
        commit(
          SET_ADDRESSES,
          getters.getAddresses.filter((item) => item.id !== addressId)
        );
        this.$notifier.warning("Адрес успешно удалён");
      } catch (e) {
        console.error(e);
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
      return state.addresses.filter(
        (address) => !!address.street && address.street !== " "
      );
    },
    getAddress(state, id) {
      return state.addresses.find((address) => address.id === id);
    },
  },
};
