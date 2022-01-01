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

    <div
      v-if="user.name"
      class="user__name"
    >
      <span data-test="profile-user-name">{{ user.name }}</span>
    </div>

    <p
      v-if="user.phone"
      class="user__phone"
    >
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
<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 33px;
}
.user__name {
  @include b-s20-h23;
  margin-left: 30px;
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.user__button {
  display: inline-block;
  cursor: pointer;
  vertical-align: middle;
}
.user__phone {
  @include b-s16-h19;
  width: 100%;
  margin-top: 20px;
  span {
    font-weight: 400;
  }
}
</style>
