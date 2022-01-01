<template>
  <div
    class="draggable"
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";
export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.effectAllowed = MOVE;
      dataTransfer.dropEffect = MOVE;
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },

    onChangeCursor() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style lang="scss" scoped>
.draggable {
  &[draggable="true"] {
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  }
}
</style>
