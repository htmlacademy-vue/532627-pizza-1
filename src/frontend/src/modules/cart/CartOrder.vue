<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          v-model="deliveryType"
          name="test"
          data-test="cart-order-select"
          class="select"
        >
          <option :value="$options.deliveryTypes.SELF">Заберу сам</option>
          <option :value="$options.deliveryTypes.NEW_ADDRESS">
            Новый адрес
          </option>
          <option
            v-for="address in addressList"
            :key="address.id"
            :value="address.id"
          >
            {{ !!address.name ? address.name : getAddressDesc(address) }}
          </option>
        </select>
      </label>
      <AppInput
        v-model="phone"
        ref="cart-order-phone"
        type="text"
        name="tel"
        mod-big-label
        placeholder="+7 999-999-99-99"
        @input="setPhone(phone)"
      >
        Контактный телефон:
      </AppInput>

      <div
        v-if="deliveryType !== $options.deliveryTypes.SELF"
        data-test="cart-order-new-address"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <AppInput
            v-model="address.street"
            :disabled="isDisabled"
            type="text"
            name="street"
            data-test="cart-order-street"
            @input="setAddress(address)"
          >
            Улица*
          </AppInput>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model="address.building"
            :disabled="isDisabled"
            type="text"
            name="house"
            is-visible-caption
            @input="setAddress(address)"
            >Дом*
          </AppInput>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <AppInput
            v-model="address.flat"
            :disabled="isDisabled"
            type="text"
            name="apartment"
            @input="setAddress(address)"
          >
            Квартира
          </AppInput>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { DELIVERY_TYPES } from "@/common/constants";
import { CHANGE_ADDRESS, CHANGE_PHONE } from "@/store/actions.types";
import AppInput from "@/common/components/AppInput";

export default {
  name: "CartOrder",
  components: { AppInput },
  data() {
    return {
      deliveryType: DELIVERY_TYPES.SELF,
      phone: "",
      address: {
        street: "",
        building: "",
        flat: "",
      },
    };
  },
  deliveryTypes: DELIVERY_TYPES,
  watch: {
    deliveryType: {
      handler(val) {
        if (val === DELIVERY_TYPES.SELF) {
          this.address = null;
        } else if (val !== DELIVERY_TYPES.NEW_ADDRESS) {
          this.address = this.addressList.find((address) => address.id === val);
        } else {
          this.address = {
            street: "",
            building: "",
            flat: "",
          };
        }
        this.setAddress(this.address);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters("Addresses", {
      addressList: "getAddresses",
    }),
    ...mapGetters("Cart", {
      getPhone: "getPhone",
    }),
    isDisabled() {
      return this.deliveryType !== this.$options.deliveryTypes.NEW_ADDRESS;
    },
  },
  mounted() {
    this.phone = this.getPhone;
  },
  methods: {
    ...mapActions("Cart", {
      setPhone: CHANGE_PHONE,
      setAddress: CHANGE_ADDRESS,
    }),

    getAddressDesc(address) {
      return `ул. ${address.street}, д. ${address.building}`;
    },
  },
};
</script>
<style lang="scss" scoped>
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;
  display: block;
  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;
  cursor: pointer;
  transition: 0.3s;
  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;
  font-family: inherit;
  appearance: none;
  &:hover {
    border-color: $orange-100;
  }
  &:focus {
    border-color: $green-500;
  }
}
</style>
