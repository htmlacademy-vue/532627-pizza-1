<template>
  <div class="app-default-layout">
    <AppLayoutHeader />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";

export default {
  name: "AppDefaultLayout",
  components: { AppLayoutHeader },
};
</script>
<style lang="scss" scoped>
.app-default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
