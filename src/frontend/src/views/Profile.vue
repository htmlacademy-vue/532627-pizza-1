<template>
  <div class="layout__content">
    <AppLayoutTitle>Мои данные</AppLayoutTitle>

    <ProfileUserData />

    <ProfileAddressList />
  </div>
</template>

<script>
import ProfileUserData from "@/modules/profile/ProfileUserData";
import ProfileAddressList from "@/modules/profile/ProfileAddressList";
import AppLayoutTitle from "@/common/components/AppLayoutTitle";

export default {
  name: "Profile",
  components: {
    AppLayoutTitle,
    ProfileAddressList,
    ProfileUserData,
  },
  data() {
    return {
      isAddingNew: false,
    };
  },
};
</script>
