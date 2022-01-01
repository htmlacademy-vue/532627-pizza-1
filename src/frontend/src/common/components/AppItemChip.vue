<template>
  <span
    :class="classModificator"
    class="filling"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: "AppItemChip",
  props: {
    value: String,
  },
  computed: {
    classModificator() {
      return {
        "filling--mushrooms": this.value === "mushrooms",
        "filling--cheddar": this.value === "cheddar",
        "filling--salami": this.value === "salami",
        "filling--ham": this.value === "ham",
        "filling--ananas": this.value === "ananas",
        "filling--bacon": this.value === "bacon",
        "filling--onion": this.value === "onion",
        "filling--chile": this.value === "chile",
        "filling--jalapeno": this.value === "jalapeno",
        "filling--olives": this.value === "olives",
        "filling--tomatoes": this.value === "tomatoes",
        "filling--salmon": this.value === "salmon",
        "filling--mozzarella": this.value === "mozzarella",
        "filling--parmesan": this.value === "parmesan",
        "filling--blue_cheese": this.value === "blue_cheese",
      };
    },
  },
};
</script>
