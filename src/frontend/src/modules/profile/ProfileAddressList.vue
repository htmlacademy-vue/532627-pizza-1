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
        data-test="profile-address-list-add-new"
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
        this.addAddress({ ...address });
        this.isAddingNew = false;
      } catch {
        return false;
      }
    },
  },
};
</script>
