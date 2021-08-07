<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <AppRadioButton
          v-for="dough in doughList"
          :key="dough.name"
          name="dough"
          :checked="dough.value === value"
          :item-value="dough.value"
          :class="{
            'dough__input--light': dough.value === 'light',
            'dough__input--large': dough.value === 'large',
          }"
          class="dough__input"
          @change="$emit('change', $event)"
        >
          <template #name>
            <b> {{ dough.name }}</b>
          </template>

          <template #description>
            <span>{{ dough.description }}</span>
          </template>
        </AppRadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/common/components/AppRadioButton";

export default {
  name: "BuilderDoughSelector",
  components: { AppRadioButton },
  props: {
    doughList: {
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
