<template>
  <div id="app">
    <AppLayout>
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
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: { AppLayout, AppNotification },
  computed: {
    ...mapGetters("Notification", {
      notification: "getNotification",
    }),

    needShowNotification() {
      return this.notification.msg;
    },
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
