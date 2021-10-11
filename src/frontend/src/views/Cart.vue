<template>
  <form method="post" class="layout-form" @submit.prevent="handleSubmit">
    <main class="content cart">
      <div class="container">
        <CartTitle />

        <CartEmpty v-if="false" />

        <CartList />

        <CartAdditional />

        <CartOrder />
      </div>
    </main>

    <CartFooter @submit="handleSubmit" />

    <CartThanksForOrder v-if="isSubmitted" />
  </form>
</template>

<script>
import CartFooter from "@/modules/cart/CartFooter";
import CartOrder from "@/modules/cart/CartOrder";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartEmpty from "@/modules/cart/CartEmpty";
import CartList from "@/modules/cart/CartList";
import CartTitle from "@/modules/cart/CartTitle";
import CartThanksForOrder from "@/modules/cart/CartThanksForOrder";
import { CREATE_ORDER } from "@/store/actions.types";
import { mapActions } from "vuex";

export default {
  name: "Cart",
  components: {
    CartThanksForOrder,
    CartTitle,
    CartList,
    CartEmpty,
    CartAdditional,
    CartOrder,
    CartFooter,
  },
  data() {
    return {
      isSubmitted: false,
    };
  },
  methods: {
    ...mapActions("Cart", {
      createOrder: CREATE_ORDER,
    }),
    async handleSubmit() {
      await this.createOrder();
      this.isSubmitted = true;
    },
  },
};
</script>
