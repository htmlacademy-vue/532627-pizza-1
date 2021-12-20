<template>
  <div class="user">
    <img
      v-if="user.avatar"
      :src="user.avatar"
      :alt="user.name"
      width="72"
      height="72"
      data-test="profile-user-avatar"
    />

    <div v-if="user.name" class="user__name">
      <span data-test="profile-user-name">{{ user.name }}</span>
    </div>

    <p v-if="user.phone" class="user__phone">
      Контактный телефон:
      <span data-test="profile-user-phone">{{ user.phone }}</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileUserData",
  computed: {
    ...mapGetters("Auth", {
      user: "getUser",
    }),
  },
};
</script>
