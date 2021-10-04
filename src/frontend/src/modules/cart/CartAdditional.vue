<template>
  <div class="cart__additional">
    <ul class="additional-list">
      <CartAdditionalItem
        v-for="miscItem in miscList"
        :key="miscItem.id"
        :misc="miscItem"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import { FETCH_MISC } from "@/store/actions.types";

export default {
  name: "CartAdditional",
  components: { CartAdditionalItem },
  computed: {
    ...mapGetters("Cart", {
      miscList: "getMisc",
    }),
  },
  mounted() {
    this.fetchMisc();
  },
  methods: {
    ...mapActions("Cart", {
      fetchMisc: FETCH_MISC,
    }),
  },
};
</script>
