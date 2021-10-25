<template>
  <form method="post" class="layout-form" @submit.prevent="handleSubmit">
    <main class="content cart">
      <div class="container">
        <CartTitle />

        <CartEmpty v-if="!cart.length" />

        <template v-else>
          <CartList />

          <CartAdditional />

          <CartOrder />
        </template>
      </div>
    </main>

    <CartFooter @submit="handleSubmit" />

    <CartThanksForOrder v-if="isSuccess" @close="setSuccess(false)" />
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import { SET_SUCCESS } from "@/store/mutation.types";

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
  computed: {
    ...mapGetters("Cart", {
      cart: "getCart",
      isSuccess: "getIsSuccess",
    }),
  },
  mounted() {
    if (!this.cart.length) {
      this.$router.push("/");
    }
  },
  beforeDestroy() {
    this.setSuccess(false);
  },
  methods: {
    ...mapActions("Cart", {
      createOrder: CREATE_ORDER,
    }),
    ...mapMutations("Cart", {
      setSuccess: SET_SUCCESS,
    }),
    async handleSubmit() {
      await this.createOrder();
      this.isSubmitted = true;
    },
  },
};
</script>
