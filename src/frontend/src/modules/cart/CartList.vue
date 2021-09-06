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
            <li>30 см, на тонком тесте</li>
            <li>Соус: {{ pizza.sauce }}</li>
            <li>Начинка: грибы, лук, ветчина, пармезан, ананас</li>
          </ul>
        </div>
      </div>

      <div class="counter cart-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>
        <input
          type="text"
          name="counter"
          class="counter__input"
          :value="pizza.quantity"
        />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="cart-list__price">
        <b>{{ pizza.price * pizza.quantity }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters("Cart", {
      pizzas: "getCart",
    }),
  },
};
</script>
