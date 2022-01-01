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
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_center.scss";
.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;
  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 46px;
    &::before {
      @include p_center_v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-color: $green-100;
      background-image: url("~@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
  &--small {
    span::before {
      background-size: 18px;
    }
  }
  &--normal {
    span::before {
      background-size: 29px;
    }
  }
  &--big {
    span::before {
      background-size: 100%;
    }
  }
  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }
  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
