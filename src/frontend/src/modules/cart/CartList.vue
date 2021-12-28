<template>
  <ul v-if="pizzas.length > 0" class="cart-list sheet">
    <li
      v-for="pizza in pizzas"
      :key="pizza.id"
      data-test="cart-item"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />

        <div class="product__text">
          <h2 data-test="cart-item-name">{{ pizza.name }}</h2>
          <ul>
            <li data-test="cart-item-size-dough">
              {{ getSize(pizza.size) }}, {{ getDough(pizza.dough) }}
            </li>
            <li>
              Соус:
              <span data-test="cart-item-sauce">{{
                getSauce(pizza.sauce)
              }}</span>
            </li>
            <li>
              Начинка:
              <span data-test="cart-item-ingredients">{{
                getIngredients(pizza.ingredients)
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <AppItemCounter
        :value="pizza.quantity"
        is-orange-theme
        data-test="pizza-item-decrease"
        class="cart-list__counter"
        @change="
          decreaseQuantity({
            id: pizza.id,
            quantity: Math.max(0, pizza.quantity - 1),
          })
        "
      />
      <div class="cart-list__price">
        <b>
          <span data-test="cart-item-total-price">{{
            pizza.price * pizza.quantity
          }}</span>
          ₽
        </b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          data-test="pizza-item-change"
          class="cart-list__edit"
          @click="change(pizza)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { SAUCE_TYPES, SIZE_TYPES } from "@/common/constants";
import { mapGetters, mapActions } from "vuex";
import { getNameByValue } from "@/common/helpers";

import {
  DECREASE_PIZZA_QUANTITY,
  EDIT_PIZZA,
  INCREASE_PIZZA_QUANTITY,
} from "@/store/actions.types";

export default {
  name: "CartList",
  computed: {
    ...mapGetters("Cart", {
      pizzas: "getCart",
    }),
  },
  methods: {
    ...mapActions("Cart", {
      decreaseQuantity: DECREASE_PIZZA_QUANTITY,
      increasePizzaQuantity: INCREASE_PIZZA_QUANTITY,
    }),
    ...mapActions("Builder", {
      changeBuilder: EDIT_PIZZA,
    }),
    getSize(value) {
      return getNameByValue(value, SIZE_TYPES);
    },
    getDough(value) {
      return `на ${value === "light" ? "тонком" : "толстом"} тесте`;
    },
    getSauce(value) {
      return getNameByValue(value, SAUCE_TYPES)?.toLowerCase();
    },
    getIngredients(items) {
      return items.map((item) => item.name.toLowerCase()).join(", ");
    },
    change(pizza) {
      this.changeBuilder(pizza);
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";
.cart-list {
  @include clear-list;
  padding: 15px 0;
}
.cart-list__item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;
  border-bottom: 1px solid rgba($green-500, 0.1);
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
}
.cart-list__product {
  flex-grow: 1;
  margin-right: auto;
}

.cart-list__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}
.cart-list__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;
  text-align: right;
  b {
    @include b-s16-h19;
  }
}
.cart-list__edit {
  @include l-s11-h13;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  outline: none;
  background-color: transparent;
  &:hover {
    color: $green-500;
  }
  &:active {
    color: $green-600;
  }
  &:focus {
    color: $green-400;
  }
}

.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
