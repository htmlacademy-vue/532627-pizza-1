<template>
  <div id="app">
    <AppStartScreen v-if="isLoading" />

    <AppLayout v-else>
      <transition name="slide-fade" mode="out-in" appear>
        <router-view />
      </transition>
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
.slide-fade-enter-active {
  transition: transform 0.3s ease;
}
.slide-fade-leave-active {
  transition: transform 0.8s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
}
</style>
