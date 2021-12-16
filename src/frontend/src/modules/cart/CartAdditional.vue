<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalItem
        v-for="miscItem in miscList"
        :key="miscItem.id"
        :misc="miscItem"
        data-test="misc-item"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";

export default {
  name: "CartAdditional",
  components: { CartAdditionalItem },
  computed: {
    ...mapGetters("Cart", {
      miscList: "getMisc",
    }),
  },
};
</script>
