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
      <b>
        Итого: <span data-test="cart-total">{{ total }}</span> ₽
      </b>
    </div>

    <div class="footer__submit">
      <button
        :disabled="isDisabledSubmit"
        type="submit"
        data-test="cart-submit"
        :class="{ 'button--disabled': isDisabledSubmit }"
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
  data() {
    return {
      isSubmitted: false,
    };
  },
  computed: {
    ...mapGetters("Cart", {
      total: "getTotal",
      isValidOrderData: "isValidOrderData",
    }),
    isDisabledSubmit() {
      return this.isSubmitted || !this.isValidOrderData;
    },
  },
  methods: {
    submitOrder() {
      this.isSubmitted = true;
      setTimeout(() => {
        this.isSubmitted = false;
      }, 1500);

      this.$emit("submit");
    },
  },
};
</script>
