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

      <div class="counter cart-list__counter">
        <button
          type="button"
          data-test="pizza-item-decrease"
          class="counter__button counter__button--minus"
          @click="
            decreaseQuantity({
              id: pizza.id,
              quantity: Math.max(0, pizza.quantity - 1),
            })
          "
        >
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          data-test="cart-item-quantity"
          :value="pizza.quantity"
          readonly
          class="counter__input"
        />

        <button
          type="button"
          data-test="pizza-item-increase"
          class="counter__button counter__button--plus counter__button--orange"
          @click="
            increasePizzaQuantity({
              id: pizza.id,
              quantity: pizza.quantity + 1,
            })
          "
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

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
