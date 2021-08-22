<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
const defaultLayout = "AppDefaultLayout";

export default {
  name: "AppLayouts",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      console.log(layout);
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
