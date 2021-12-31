<template>
  <section class="footer">
    <div class="footer__more">
      <AppButton tag="a" mod-border mod-arrow @click="goToBuilder">
        Хочу еще одну
      </AppButton>
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
      <AppButton
        :disabled="isDisabledSubmit"
        type="submit"
        data-test="cart-submit"
        @click.prevent="submitOrder"
      >
        Оформить заказ
      </AppButton>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import AppButton from "@/common/components/AppButton";

export default {
  name: "CartFooter",
  components: { AppButton },
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
    goToBuilder() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.footer {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding: 25px 2.12%;
  background-color: rgba($green-500, 0.1);
}
.footer__more {
  width: 220px;
  margin-right: 16px;
  ::v-deep a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
.footer__text {
  @include l-s11-h13;
  color: rgba($black, 0.5);
}
.footer__price {
  @include b-s24-h28;
  margin-right: 12px;
  margin-left: auto;
}
.footer__submit {
  ::v-deep button {
    padding: 16px 14px;
  }
}
</style>
