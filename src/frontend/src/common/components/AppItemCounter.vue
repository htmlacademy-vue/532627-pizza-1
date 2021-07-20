<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input type="text" name="counter" class="counter__input" :value="value" />

    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="increase"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    increase() {
      return this.$emit("change", this.value + 1);
    },
    decrease() {
      if (!this.value) {
        return false;
      }

      return this.$emit("change", this.value - 1);
    },
  },
};
</script>
