<template>
  <div class="sign-form">
    <a
      href="#"
      data-test="login-close"
      class="close close--white"
      @click.prevent="$router.push('/')"
    >
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>

    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>

    <form data-test="login-form" @submit.prevent="submit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
            data-test="login-email"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="password"
            type="password"
            name="pass"
            placeholder="***********"
            data-test="login-password"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import { LOGIN } from "@/store/actions.types";
import { mapActions, mapGetters } from "vuex";
import { loggedIn } from "@/middlewares";

export default {
  name: "Login",
  middlewares: [loggedIn],
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters("Auth", {
      isLoggedIn: "isLoggedIn",
    }),
  },
  watch: {
    isLoggedIn(val) {
      if (val) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    ...mapActions("Auth", {
      login: LOGIN,
    }),
    async submit() {
      try {
        await this.login({ email: this.email, password: this.password });
      } catch (e) {
        this.$notifier.error(e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.sign-form {
  @include pf_center-all;
  z-index: 10;
  display: block;
  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;
  background: $white url("~@/assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;
  ::v-deep button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}
.sign-form__title {
  margin-bottom: 24px;
  text-align: center;
}
.sign-form__input {
  margin-bottom: 16px;
}
.popup-enter-active,
.popup-leave-active {
  transition: 0.5s;
}
.popup-enter {
  transform: translate(-50%, -50%) scale(0.8);
  opacity: 0;
}
.popup-leave-to {
  transform: translate(-50%, -50%) scale(1.2);
  opacity: 0;
}
</style>
