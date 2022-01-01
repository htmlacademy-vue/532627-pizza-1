<template>
  <div class="notification">
    <span
      data-test="message"
      :class="{
        notification__message_warning: type === 'warning',
        notification__message_error: type === 'error',
        notification__message_success: type === 'success',
      }"
      class="notification__message"
    >
      {{ message }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppNotification",
  props: {
    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "info",
    },
  },
};
</script>

<style lang="scss">
.notification {
  position: fixed;
  bottom: 80px;
  left: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  min-height: 100px;
  padding: 0 16px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 4%), 0 0 2px rgb(0 0 0 / 6%),
    0 0 1px rgb(0 0 0 / 4%);
  background: #fff;

  &__message {
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;

    &_warning {
      color: $orange-100;
    }

    &_success {
      color: $green-600;
    }

    &_error {
      color: $red-800;
    }
  }
}
</style>
