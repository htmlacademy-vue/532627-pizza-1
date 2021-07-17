<template>
  <label>
    <input
      :name="name"
      :value="itemValue"
      type="radio"
      class="visually-hidden"
      @change="$emit('change', itemValue)"
    />

    <slot name="name"></slot>

    <slot name="description"></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
  },
};
</script>
