<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <RadioButton
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
        >
          <template #name>
            <b> {{ dough.name }}</b>
          </template>

          <template #description>
            <span>{{ dough.description }}</span>
          </template>
        </RadioButton>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
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
