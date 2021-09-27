<template>
  <div id="app">
    <AppStartScreen v-if="isLoading" />

    <AppLayout v-else>
      <router-view />
    </AppLayout>

    <transition name="fade">
      <AppNotification
        v-if="needShowNotification"
        :message="notification.msg"
        :type="notification.type"
      />
    </transition>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout";
import AppNotification from "@/common/components/AppNotification";
import AppStartScreen from "@/common/components/AppStartScreen";
import { mapGetters, mapActions } from "vuex";
import { INIT } from "@/store/actions.types";

export default {
  name: "App",
  components: { AppLayout, AppNotification, AppStartScreen },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters("Notification", {
      notification: "getNotification",
    }),

    ...mapGetters(["isLoading"]),

    needShowNotification() {
      return this.notification.msg;
    },
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
