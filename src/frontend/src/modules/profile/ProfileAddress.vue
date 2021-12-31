<template>
  <div class="layout__address">
    <ProfileAddressForm
      v-if="isEditing"
      data-test="profile-address-form"
      :number="number"
      :address="address"
      @submit="updateAddress"
      @remove="removeAddress(address.id)"
    />
    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b
          >Адрес №
          <span data-test="profile-address-title"
            >{{ number }}. {{ address.name }}</span
          >
        </b>

        <div class="address-form__edit">
          <button
            type="button"
            data-test="profile-address-edit"
            class="icon"
            @click="isEditing = true"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>

      <p data-test="profile-formatted-address">{{ formattedAddress }}</p>
      <small v-if="address.comment" data-test="profile-address-comment">{{
        address.comment
      }}</small>
    </div>
  </div>
</template>

<script>
import ProfileAddressForm from "./ProfileAddressForm.vue";
import { REMOVE_ADDRESS, UPDATE_ADDRESS } from "@/store/actions.types";
import { mapActions } from "vuex";

export default {
  name: "ProfileAddress",
  components: { ProfileAddressForm },
  props: {
    number: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    formattedAddress() {
      if (!this.address.flat) {
        return `${this.address.street} ${this.address.building}`;
      } else {
        return `${this.address.street} ${this.address.building} ${this.address.flat}`;
      }
    },
  },
  methods: {
    ...mapActions("Addresses", {
      updateAddress: UPDATE_ADDRESS,
      removeAddress: REMOVE_ADDRESS,
    }),
    handleAddressSubmit(updatedAddress) {
      this.isEditing = false;
      this.updateAddress(updatedAddress);
    },
  },
};
</script>
<style lang="scss" scoped>
.address-form__header {
  @include b-s14-h16;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba($green-500, 0.1);
}
.icon {
  display: block;
  overflow: hidden;
  width: 32px;
  height: 32px;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    box-shadow: $shadow-light;
  }
  &:active {
    box-shadow: $shadow-large;
  }
  &:focus {
    box-shadow: $shadow-regular;
  }
}
.address-form {
  $bl: &;
  position: relative;
  padding-top: 0;
  padding-bottom: 26px;
  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }
  small {
    @include l-s11-h13;
    display: block;
    padding: 0 16px;
  }
}
</style>
