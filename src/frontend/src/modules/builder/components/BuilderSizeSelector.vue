<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <RadioButton
          v-for="size in sizes"
          :key="size.name"
          :item-value="size.value"
          name="diameter"
          :class="{
            'diameter__input--small': size.value === 'small',
            'diameter__input--normal': size.value === 'normal',
            'diameter__input--normal': size.value === 'big',
          }"
          class="diameter__input"
        >
          <template #name>
            <span>{{ size.name }}</span>
          </template>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
};
</script>
