<template>
  <div class="content__result">
    <p data-test="price-counter-total-sum">Итого: {{ totalSum }} ₽</p>
    <button
      type="button"
      :disabled="isDisabledSubmit"
      data-test="price-counter-button"
      :class="{ 'button--disabled': isDisabledSubmit }"
      class="button"
      @click="id ? edit() : createCart()"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { CREATE_CART, EDIT_CART_PIZZA } from "@/store/actions.types";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", {
      totalSum: "totalSum",
      isDisabledSubmit: "isDisabledSubmit",
      id: "getId",
      quantity: "getQuantity",
    }),
  },
  methods: {
    ...mapActions("Cart", {
      createCart: CREATE_CART,
      editPizza: EDIT_CART_PIZZA,
    }),
    edit() {
      this.editPizza({ id: this.id, quantity: this.quantity });
      this.$router.push("/cart");
    },
  },
};
</script>
