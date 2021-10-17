<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ total }} ₽</router-link>
    </div>
    <div class="header__user">
      <template v-if="isLoggedIn">
        <router-link to="/profile">
          <img :src="user.avatar" :alt="user.name" width="32" height="32" />
          <span>{{ user.name }}</span>
        </router-link>

        <button class="header__logout" @click.prevent="logout">
          <span>Выйти</span>
        </button>
      </template>
      <router-link v-else to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { LOGOUT } from "@/store/actions.types";
export default {
  name: "AppLayoutHeader",
  computed: {
    ...mapGetters("Cart", {
      total: "getTotal",
    }),
    ...mapGetters("Auth", {
      isLoggedIn: "isLoggedIn",
      user: "getUser",
    }),
  },
  methods: {
    ...mapActions("Auth", { logout: LOGOUT }),

    handleLogout() {
      this.logout();
      this.$notifier.warning("Вы вышли из своей учётной записи");
      this.$router.push("/");
    },
  },
};
</script>
