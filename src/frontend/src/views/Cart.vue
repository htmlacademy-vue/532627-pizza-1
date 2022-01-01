<template>
  <form
    method="post"
    data-test="cart-form"
    class="layout-form"
    @submit.prevent="handleSubmit"
  >
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

    <transition
      name="fade"
      mode="out-in"
    >
      <CartThanksForOrder
        v-if="isSuccess"
        @close="setSuccess(false)"
      />
    </transition>
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

<style lang="scss" scoped>
.cart__title {
  margin-bottom: 15px;
}
.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}
.cart__empty {
  padding: 20px 30px;
}
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.cart-form__select {
  display: flex;
  align-items: center;
  margin-right: auto;
  span {
    margin-right: 16px;
  }
}
.cart-form__label {
  @include b-s16-h19;
  white-space: nowrap;
}
.cart-form__address {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
.cart-form__input {
  flex-grow: 1;
  margin-bottom: 20px;
  margin-left: 16px;
  &--small {
    max-width: 120px;
  }
}
</style>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
