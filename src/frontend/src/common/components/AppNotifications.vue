<template>
  <div v-if="notifications && notifications.length">
    <AppNotification
      v-for="notification in notifications"
      :key="notification.id"
      :message="notification.msg"
      :type="notification.type"
    />
  </div>
</template>

<script>
import AppNotification from "./AppNotification";
import { mapGetters } from "vuex";

export default {
  name: "AppNotifications",
  components: { AppNotification },
  computed: {
    ...mapGetters("Notification", {
      notifications: "getNotifications",
    }),
  },
};
</script>
