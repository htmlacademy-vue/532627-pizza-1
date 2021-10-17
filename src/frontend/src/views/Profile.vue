<template>
  <div class="layout__content">
    <ProfileTitle />

    <ProfileUserData />

    <ProfileAddressList />
  </div>
</template>

<script>
import ProfileTitle from "@/modules/profile/ProfileTitle";
import ProfileUserData from "@/modules/profile/ProfileUserData";
import ProfileAddressList from "@/modules/profile/ProfileAddressList";

export default {
  name: "Profile",
  components: {
    ProfileAddressList,
    ProfileUserData,
    ProfileTitle,
  },
  data() {
    return {
      isAddingNew: false,
    };
  },
};
</script>
