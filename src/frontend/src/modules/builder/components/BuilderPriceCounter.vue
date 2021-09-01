<template>
  <div class="content__result">
    <p>Итого: {{ totalSum }} ₽</p>
    <button
      type="button"
      :disabled="isDisabledSubmit"
      :class="{ 'button--disabled': isDisabledSubmit }"
      class="button"
      @click="createCart"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { CREATE_CART } from "@/store/actions-types";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["totalSum", "isDisabledSubmit"]),
  },
  methods: {
    ...mapActions("Cart", {
      createCart: CREATE_CART,
    }),
  },
};
</script>
