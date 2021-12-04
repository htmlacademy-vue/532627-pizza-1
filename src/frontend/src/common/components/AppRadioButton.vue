<template>
  <label>
    <input
      :name="name"
      :value="itemValue"
      type="radio"
      :checked="checked"
      data-test="radio-input"
      class="visually-hidden"
      @change="$emit('change', itemValue)"
    />

    <slot data-test="slot-name" name="name"></slot>

    <slot name="description"></slot>
  </label>
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
