<template>
  <div class="layout__address">
    <ProfileAddressForm v-if="isEditing" :number="number" :address="address" />
    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ number }}. {{ address.name }}</b>

        <div class="address-form__edit">
          <button type="button" class="icon" @click="isEditing = true">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>

      <p>{{ formattedAddress }}</p>
      <small v-if="address.comment">{{ address.comment }}</small>
    </div>
  </div>
</template>

<script>
import ProfileAddressForm from "./ProfileAddressForm.vue";
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
};
</script>
