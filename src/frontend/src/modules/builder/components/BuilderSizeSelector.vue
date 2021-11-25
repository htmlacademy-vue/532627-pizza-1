<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <AppRadioButton
          v-for="size in sizeList"
          :key="size.name"
          :item-value="size.value"
          name="diameter"
          :checked="size.value === sizeValue"
          data-test="size-radio-input"
          :class="{
            'diameter__input--small': size.value === 'small',
            'diameter__input--normal': size.value === 'normal',
            'diameter__input--normal': size.value === 'big',
          }"
          class="diameter__input"
          @change="changeSizeValue"
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
import { mapGetters, mapActions } from "vuex";
import AppRadioButton from "@/common/components/AppRadioButton";
import { CHANGE_SIZE } from "@/store/actions.types";

export default {
  name: "BuilderSizeSelector",
  components: { AppRadioButton },
  computed: {
    ...mapGetters("Builder", {
      sizeValue: "getSizeValue",
      sizeList: "getSizeList",
    }),
  },
  methods: {
    ...mapActions("Builder", {
      changeSizeValue: CHANGE_SIZE,
    }),
  },
};
</script>
