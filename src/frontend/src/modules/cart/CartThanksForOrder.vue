<template>
  <div class="popup">
    <a
      href="#"
      class="close"
      @click="close"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <AppButton
        ref="back-link"
        tag="a"
        class="button"
        @click="goNext"
      >
        Отлично, я жду!
      </AppButton>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppButton from "@/common/components/AppButton";

export default {
  name: "CartThanksForOrder",
  components: { AppButton },

  computed: {
    ...mapGetters("Auth", {
      isLoggedIn: "isLoggedIn",
    }),
  },

  methods: {
    close() {
      this.$emit("close");
    },

    goNext() {
      const nextPath = this.isLoggedIn ? "/orders" : "/";
      this.$router.push(nextPath);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}
</style>
