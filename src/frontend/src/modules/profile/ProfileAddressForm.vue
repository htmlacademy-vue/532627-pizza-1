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
        <AppInput
          v-model="name"
          type="text"
          name="addr-name"
          data-test="profile-address-name"
          placeholder="Введите название адреса"
          required
        >
          Название адреса*
        </AppInput>
      </div>

      <div class="address-form__input address-form__input--size--normal">
        <AppInput
          v-model="street"
          type="text"
          name="addr-street"
          placeholder="Введите название улицы"
          required
          data-test="profile-address-street"
        >
          Улица*
        </AppInput>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="building"
          type="text"
          name="addr-house"
          placeholder="Введите номер дома"
          required
          data-test="profile-address-building"
        >
          Дом*
        </AppInput>
      </div>

      <div class="address-form__input address-form__input--size--small">
        <AppInput
          v-model="flat"
          type="text"
          name="addr-apartment"
          placeholder="Введите № квартиры"
          data-test="profile-address-flat"
        >
          Квартира
        </AppInput>
      </div>

      <div class="address-form__input">
        <AppInput
          v-model="comment"
          type="text"
          name="addr-comment"
          placeholder="Введите комментарий"
          data-test="profile-address-comment"
        >
          Комментарий
        </AppInput>
      </div>
    </div>

    <div class="address-form__buttons">
      <AppButton
        mod-transparent
        data-test="profile-address-form-btn-remove"
        @click="remove"
      >
        Удалить
      </AppButton>

      <AppButton :disabled="isDisabled" type="submit"> Сохранить </AppButton>
    </div>
  </form>
</template>

<script>
import AppButton from "@/common/components/AppButton";
import AppInput from "@/common/components/AppInput";
export default {
  name: "ProfileAddressForm",
  components: { AppInput, AppButton },
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
<style lang="scss" scoped>
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

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 80%;
  padding: 16px;
}
.address-form__input {
  width: 100%;
  margin-bottom: 16px;
  &--size {
    &--normal {
      width: 60.5%;
    }
    &--small {
      width: 18%;
    }
  }
}
.address-form__buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0 16px;

  .button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}
.address-form__header {
  @include b-s14-h16;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 21px;
  padding: 10px 16px;
  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
