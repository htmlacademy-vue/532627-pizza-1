<template>
  <div class="counter counter--orange">
    <button
      type="button"
      :disabled="value === 0"
      data-test="button--minus"
      :class="{ 'counter__button--disabled': value === 0 }"
      class="counter__button counter__button--minus"
      @click="decrease"
    >
      <span class="visually-hidden">Меньше</span>
    </button>

    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="value"
      @input="input"
    />

    <button
      type="button"
      :disabled="value === maxValue"
      data-test="button--plus"
      :class="{ 'counter__button--disabled': value === maxValue }"
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
    maxValue: {
      type: Number,
      default: 3,
    },
  },
  methods: {
    input(evt) {
      const emittedValue = parseInt(evt.target.value);
      if (!emittedValue || emittedValue < 0 || emittedValue > this.maxValue) {
        return false;
      }
      this.$emit("change", emittedValue);
    },

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
