<template>
  <div class="popup">
    <a href="#" class="close" @click="close">
      <span class="visually-hidden">Закрыть попап</span>
    </a>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="isLoggedIn ? '/orders' : '/'" class="button">
        Отлично, я жду!</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartThanksForOrder",
  computed: {
    ...mapGetters("Auth", {
      isLoggedIn: "isLoggedIn",
    }),
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
