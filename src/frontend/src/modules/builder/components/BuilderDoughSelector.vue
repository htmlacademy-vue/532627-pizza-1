<template>
  <div v-if="doughList.length" class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <AppRadioButton
          v-for="dough in doughList"
          :key="dough.name"
          name="dough"
          :checked="dough.value === doughValue"
          :item-value="dough.value"
          data-test="dough-radio-input"
          :class="{
            'dough__input--light': dough.value === 'light',
            'dough__input--large': dough.value === 'large',
          }"
          class="dough__input"
          @change="setDough"
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
import { mapGetters, mapActions } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";
import { CHANGE_DOUGH } from "@/store/actions.types";

export default {
  name: "BuilderDoughSelector",
  components: { AppRadioButton },
  computed: {
    ...mapGetters("Builder", {
      doughList: "getDoughList",
      doughValue: "getDoughValue",
    }),
  },
  methods: {
    ...mapActions("Builder", {
      setDough: CHANGE_DOUGH,
    }),
  },
};
</script>
