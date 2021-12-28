<template>
  <div class="content__result">
    <p data-test="price-counter-total-sum">Итого: {{ totalSum }} ₽</p>

    <AppButton
      :disabled="isDisabledSubmit"
      data-test="price-counter-button"
      :class="{ 'button--disabled': isDisabledSubmit }"
      @click="id ? edit() : createCart()"
    >
      Готовьте!
    </AppButton>
  </div>
</template>

<script>
import { CREATE_CART, EDIT_CART_PIZZA } from "@/store/actions.types";
import { mapGetters, mapActions } from "vuex";
import AppButton from "@/common/components/AppButton";

export default {
  name: "BuilderPriceCounter",
  components: { AppButton },
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
