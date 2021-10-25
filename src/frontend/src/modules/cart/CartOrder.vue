<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="deliveryType" name="test" class="select">
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

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          v-model="phone"
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          @input="setPhone(phone)"
        />
      </label>

      <div
        v-if="deliveryType !== $options.deliveryTypes.SELF"
        class="cart-form__address"
      >
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="address.street"
              :disabled="isDisabled"
              type="text"
              name="street"
              @input="setAddress(address)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="address.building"
              :disabled="isDisabled"
              type="text"
              name="house"
              @input="setAddress(address)"
            />
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="address.flat"
              :disabled="isDisabled"
              type="text"
              name="apartment"
              @input="setAddress(address)"
            />
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_PHONE, SET_ADDRESS } from "@/store/mutation.types";
import { mapGetters, mapMutations } from "vuex";
import { DELIVERY_TYPES } from "@/common/constants";

export default {
  name: "CartOrder",
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
        console.log(this.address);
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
    ...mapMutations("Cart", {
      setPhone: SET_PHONE,
      setAddress: SET_ADDRESS,
    }),

    getAddressDesc(address) {
      return `ул. ${address.street}, д. ${address.building}`;
    },
  },
};
</script>
