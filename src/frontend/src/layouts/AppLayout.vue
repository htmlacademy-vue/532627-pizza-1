<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <Index />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import Index from "@/views/Index";

export default {
  name: "AppLayouts",
  components: { Index, AppLayoutHeader },
};
</script>
