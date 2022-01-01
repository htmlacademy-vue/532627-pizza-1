<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        v-if="misc.image"
        :src="misc.image"
        data-test="misc-image"
        width="39"
        height="60"
        :alt="misc.name"
      />
      <span data-test="misc-name">{{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <AppItemCounter
          :value="misc.quantity"
          is-orange-theme
          data-test="misc-quantity"
          @change="changeMisc(misc, $event)"
        />
      </div>

      <div class="additional-list__price">
        <b>
          <span data-test="misc-price">{{ misc.price }}</span> ₽
        </b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapActions } from "vuex";
import { UPDATE_MISC } from "@/store/actions.types";
import AppItemCounter from "@/common/components/AppItemCounter.vue";

export default {
  name: "CartAdditionalItem",
  components: { AppItemCounter },

  props: {
    misc: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    ...mapActions("Cart", {
      updateMisc: UPDATE_MISC,
    }),

    changeMisc(misc, quantity) {
      this.updateMisc({ id: misc.id, quantity: quantity });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";
.additional-list__description {
  display: flex;
  align-items: flex-start;
  margin: 0 0 8px 0;
}
.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  img {
    margin-right: 10px;
    margin-left: 15px;
  }
  span {
    @include b-s14-h16;
    display: inline;
    width: 100px;
    margin-right: 15px;
  }
}
.additional-list__wrapper {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;
  border-top: 1px solid rgba($green-500, 0.1);
}
.additional-list__counter {
  width: 54px;
  margin-right: auto;
}
.additional-list__price {
  @include b-s16-h19;
}
</style>
