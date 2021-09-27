<template>
  <ul v-if="pizzas.length > 0" class="cart-list sheet">
    <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          :alt="pizza.name"
        />

        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>{{ getSize(pizza.size) }}, {{ getDough(pizza.dough) }}</li>
            <li>Соус: {{ getSauce(pizza.sauce) }}</li>
            <li>Начинка: {{ getIngredients(pizza.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button
          type="button"
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
          class="counter__input"
          :value="pizza.quantity"
          readonly
        />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="
            changePizzaQuantity({ id: pizza.id, quantity: pizza.quantity + 1 })
          "
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit" @click="change(pizza)">
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { SAUCE_TYPES, SIZE_TYPES } from "@/common/constants";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { getNameByValue } from "@/common/helpers";
import { CHANGE_PIZZA, CHANGE_PIZZA_QUANTITY } from "@/store/mutation.types";
import { DECREASE_PIZZA_QUANTITY } from "@/store/actions.types";

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
    }),
    ...mapMutations("Builder", {
      changeBuilder: CHANGE_PIZZA,
    }),
    ...mapMutations("Cart", {
      changePizzaQuantity: CHANGE_PIZZA_QUANTITY,
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
    getIngredients(value) {
      return value.map((item) => item.name.toLowerCase()).join(", ");
    },
    change(pizza) {
      this.changeBuilder(pizza);
      this.$router.push("/");
    },
  },
};
</script>
