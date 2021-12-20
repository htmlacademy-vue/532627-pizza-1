<template>
  <form
    method="post"
    data-test="profile-address-form"
    class="address-form address-form--opened sheet"
    @submit.prevent="save"
  >
    <div class="address-form__header">
      <b
        >Адрес №<span data-test="profile-address-number">{{ number }}</span></b
      >
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса*</span>

          <input
            v-model="name"
            type="text"
            name="addr-name"
            data-test="profile-address-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица*</span>

          <input
            v-model="street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
            data-test="profile-address-street"
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом*</span>

          <input
            v-model="building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
            data-test="profile-address-building"
          />
        </label>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>

          <input
            v-model="flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
            data-test="profile-address-flat"
          />
        </label>
      </div>

      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>

          <input
            v-model="comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
            data-test="profile-address-comment"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        type="button"
        data-test="profile-address-form-btn-remove"
        class="button button--transparent"
        @click="remove"
      >
        Удалить
      </button>

      <button
        :disabled="isDisabled"
        type="submit"
        :class="{ 'button-disabled': isDisabled }"
        class="button"
      >
        Сохранить
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProfileAddressForm",
  props: {
    number: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      id: this.address.id || "",
      name: this.address.name || "",
      street: this.address.street || "",
      building: this.address.building || "",
      flat: this.address.flat || "",
      comment: this.address.comment || "",
    };
  },
  computed: {
    isDisabled() {
      return !this.street || !this.building || !this.flat;
    },
  },
  methods: {
    remove() {
      this.$emit("remove");
    },
    save() {
      const address = {
        name: this.name,
        street: this.street,
        building: this.building,
        flat: this.flat,
        comment: this.comment,
      };

      if (this.id) {
        address.id = this.id;
      }
      this.$emit("submit", address);
    },
  },
};
</script>
