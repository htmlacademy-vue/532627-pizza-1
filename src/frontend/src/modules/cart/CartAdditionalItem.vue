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
        <button
          type="button"
          data-test="misc-minus"
          class="counter__button counter__button--minus"
          @click="updateMisc({ id: misc.id, quantity: misc.quantity - 1 })"
        >
          <span class="visually-hidden">Меньше</span>
        </button>

        <input
          :value="misc.quantity"
          type="text"
          name="counter"
          data-test="misc-quantity"
          class="counter__input"
          readonly
        />

        <button
          type="button"
          data-test="misc-plus"
          class="counter__button counter__button--plus counter__button--orange"
          @click="updateMisc({ id: misc.id, quantity: misc.quantity + 1 })"
        >
          <span class="visually-hidden">Больше</span>
        </button>
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
export default {
  name: "CartAdditionalItem",
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
  },
};
</script>
