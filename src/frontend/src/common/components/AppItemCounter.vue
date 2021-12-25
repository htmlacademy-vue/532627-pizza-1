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

<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.counter__button {
  $el: &;
  $size_icon: 50%;
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  border-radius: 50%;
  outline: none;
  &--minus {
    background-color: $purple-100;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $black;
    }
    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $purple-200;
    }
    &:active:not(#{$el}--disabled) {
      background-color: $purple-300;
    }
    &:focus:not(#{$el}--disabled) {
      box-shadow: $shadow-regular;
    }
    &#{$el}--disabled {
      cursor: default;
      &::before {
        opacity: 0.1;
      }
    }
  }
  &--plus {
    background-color: $green-500;
    &::before {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      border-radius: 2px;
      background-color: $white;
    }
    &::after {
      @include p_center-all;
      width: $size_icon;
      height: 2px;
      content: "";
      transform: translate(-50%, -50%) rotate(90deg);
      border-radius: 2px;
      background-color: $white;
    }
    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $green-400;
    }
    &:active:not(#{$el}--disabled) {
      background-color: $green-600;
    }
    &:focus:not(#{$el}--disabled) {
      box-shadow: $shadow-regular;
    }
    &#{$el}--disabled {
      cursor: default;
      opacity: 0.3;
    }
  }
  &--orange {
    background-color: $orange-200;
    &:hover:not(:active):not(#{$el}--disabled) {
      background-color: $orange-100;
    }
    &:active:not(#{$el}--disabled) {
      background-color: $orange-300;
    }
  }
}
.counter__input {
  @include r-s14-h16;
  box-sizing: border-box;
  width: 22px;
  margin: 0;
  padding: 0 3px;
  text-align: center;
  color: $black;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  &:focus {
    box-shadow: inset $shadow-regular;
  }
}
</style>
