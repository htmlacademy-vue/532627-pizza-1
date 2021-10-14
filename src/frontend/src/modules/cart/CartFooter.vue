<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>

    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>

    <div class="footer__price">
      <b>Итого: {{ total }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        :disabled="!isValidOrderData"
        type="submit"
        :class="{ 'button--disabled': !isValidOrderData }"
        class="button"
        @click.prevent="submitOrder"
      >
        Оформить заказ
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartFooter",
  computed: {
    ...mapGetters("Cart", {
      total: "getTotal",
      isValidOrderData: "isValidOrderData",
    }),
  },
  methods: {
    submitOrder() {
      this.$emit("submit");
    },
  },
};
</script>
