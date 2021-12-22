<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b
          >Заказ #<span data-test="order-id">{{ order.id }}</span></b
        >
      </div>

      <div class="order__sum">
        <span
          >Сумма заказа:
          <span data-test="order-total">{{ total }}</span> ₽</span
        >
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="removeOrder(order.id)"
        >
          Удалить
        </button>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button"
          data-test="repeat-order"
          @click="handleRepeatOrder"
        >
          Повторить
        </button>
      </div>
    </div>

    <ul class="order__list">
      <li
        v-for="pizza in order.orderPizzas"
        :key="pizza.id"
        class="order__item"
      >
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />

          <div class="product__text">
            <h2 data-test="order-pizza-name">{{ pizza.name }}</h2>

            <ul>
              <li>
                <span data-test="order-size">{{
                  getSizeDesc(pizza.sizeId)
                }}</span
                >,
                <span data-test="order-dough">{{
                  getDoughDesc(pizza.doughId)
                }}</span>
              </li>
              <li>
                Соус:
                <span data-test="order-sauce">{{
                  getSauceDesc(pizza.sauceId)
                }}</span>
              </li>
              <li>
                Начинка:
                <span data-test="order-ingredients">{{
                  getIngredientsDesc(pizza.ingredients)
                }}</span>
              </li>
            </ul>
          </div>
        </div>

        <p v-if="total" class="order__price">{{ total }} ₽</p>
      </li>
    </ul>

    <ul v-if="formattedMisc.length" class="order__additional">
      <li v-for="miscItem in formattedMisc" :key="miscItem.id">
        <img
          :src="miscItem.image"
          width="20"
          height="30"
          :alt="miscItem.name"
        />

        <p>
          <span>{{ miscItem.name }}</span>
          <b>{{ miscItem.price }} ₽</b>
        </p>
      </li>
    </ul>

    <p data-test="order-address" class="order__address">
      {{ orderAddress }}
    </p>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { REMOVE_ORDER, REPEAT_ORDER } from "@/store/actions.types";

export default {
  name: "OrderItem",
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("Orders", {
      totalSum: "getOrderSumm",
    }),
    ...mapGetters("Builder", {
      doughList: "getDoughList",
      sauceList: "getSauceList",
      sizeList: "getSizeList",
      ingredientList: "getIngredientList",
    }),

    ...mapGetters("Cart", {
      miscList: "getMisc",
    }),

    formattedMisc() {
      if (!this.order.orderMisc?.length) {
        return [];
      }

      return this.order.orderMisc.map((orderMisc) => {
        return this.miscList.find((misc) => misc.id === orderMisc.miscId);
      });
    },
    total() {
      return this.totalSum(this.order.id);
    },

    orderAddress() {
      if (!this.order.addressId) {
        return "Самовывоз";
      }

      let fullAddress = `Адрес доставки: ул. ${this.order.orderAddress.street}, д. ${this.order.orderAddress.building}`;

      if (this.order.orderAddress.flat) {
        return `${fullAddress}, кв. ${this.order.orderAddress.flat}`;
      }

      return fullAddress;
    },
  },
  methods: {
    ...mapActions("Orders", {
      removeOrder: REMOVE_ORDER,
    }),

    ...mapActions("Cart", {
      repeatOrder: REPEAT_ORDER,
    }),

    getDoughDesc(doughId) {
      const dough = this.doughList.find((it) => it.id === doughId)?.value;
      return dough === "light" ? "на тонком тесте" : "на толстом тесте";
    },

    getSauceDesc(sauceId) {
      return this.sauceList
        .find((it) => it.id === sauceId)
        ?.name?.toLowerCase();
    },

    getIngredientsDesc(ingredients) {
      const ingredientsList = ingredients.map((item) => {
        const ingredient = this.ingredientList.find(
          (it) => it.id === item.ingredientId
        );
        return ingredient?.name.toLowerCase();
      });
      return ingredientsList.join(", ");
    },

    getSizeDesc(sizeId) {
      return this.sizeList.find((it) => it.id === sizeId)?.name;
    },
    handleRepeatOrder() {
      this.repeatOrder(this.order.id);
      this.$router.push({ name: "Cart" });
    },
  },
};
</script>
