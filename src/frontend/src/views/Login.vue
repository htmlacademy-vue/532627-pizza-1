<template>
  <div class="sign-form">
    <a href="#" class="close close--white" @click.prevent="$router.push('/')">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </a>

    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>

    <form @submit.prevent="submit">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
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

export default {
  name: "Login",
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
