<template>
  <label :class="{ radio: radio }">
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
    radio: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.radio {
  cursor: pointer;
  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 28px;
    &:before {
      @include p_center-v;
      display: block;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      content: "";
      transition: 0.3s;
      border: 1px solid $purple-400;
      border-radius: 50%;
      background-color: $white;
    }
  }
  &:hover {
    input:not(:checked):not(:disabled) + span {
      &:before {
        border-color: $purple-800;
      }
    }
  }
  input {
    display: none;
    &:checked + span {
      &:before {
        border: 6px solid $green-500;
      }
    }
    &:disabled {
      & + span {
        &:before {
          border-color: $purple-400;
          background-color: $silver-200;
        }
      }
      &:checked + span {
        &:before {
          border: 6px solid $purple-400;
        }
      }
    }
  }
}
</style>
