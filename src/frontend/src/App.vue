<template>
  <div id="app">
    <AppStartScreen v-if="isLoading" />

    <AppLayout v-else>
      <router-view />
    </AppLayout>

    <transition name="fade">
      <AppNotifications />
    </transition>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppNotifications from "@/common/components/AppNotifications";
import AppStartScreen from "@/common/components/AppStartScreen";
import { mapGetters, mapActions } from "vuex";
import { INIT } from "@/store/actions.types";
import { initUser } from "@/common/helpers";

export default {
  name: "App",
  components: { AppLayout, AppNotifications, AppStartScreen },
  mounted() {
    this.init();
    initUser(this.$store);
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  methods: {
    ...mapActions({ init: INIT }),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
