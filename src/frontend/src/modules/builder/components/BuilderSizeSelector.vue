<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <AppRadioButton
          v-for="size in sizes"
          :key="size.name"
          :item-value="size.value"
          name="diameter"
          :checked="size.value === value"
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
        </AppRadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderSizeSelector",
  components: { AppRadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
  },
};
</script>
