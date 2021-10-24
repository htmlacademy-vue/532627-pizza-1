<template>
  <div>
    <ProfileAddress
      v-for="(address, index) in addressList"
      :key="address.id"
      :number="index + 1"
      :address="address"
    />

    <ProfileAddressForm
      v-if="isAddingNew"
      :number="newAddressNumber"
      :address="{}"
      @remove="isAddingNew = false"
      @submit="saveNewAdrress"
    />

    <div v-else class="layout__button">
      <button
        :disabled="isAddingNew"
        type="button"
        class="button button--border"
        @click="isAddingNew = true"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProfileAddress from "@/modules/profile/ProfileAddress";
import { ADD_ADDRESS, FETCH_ADRESSES } from "@/store/actions.types";
import ProfileAddressForm from "@/modules/profile/ProfileAddressForm";
import { getRandomInt } from "@/common/helpers";

export default {
  name: "ProfileAddressList",
  components: { ProfileAddressForm, ProfileAddress },
  data() {
    return {
      isAddingNew: false,
    };
  },
  computed: {
    ...mapGetters("Addresses", {
      addressList: "getAddresses",
    }),
    newAddressNumber() {
      return this.addressList.length + 1;
    },
  },
  mounted() {
    if (!this.addressList?.length) {
      this.fetchAddresses();
    }
  },
  methods: {
    ...mapActions("Addresses", {
      fetchAddresses: FETCH_ADRESSES,
      addAddress: ADD_ADDRESS,
    }),
    saveNewAdrress(address) {
      try {
        const addressId = address.id ? address.id : getRandomInt().toString();
        this.addAddress({ ...address, id: addressId });
        this.isAddingNew = false;
      } catch {
        return false;
      }
    },
  },
};
</script>
