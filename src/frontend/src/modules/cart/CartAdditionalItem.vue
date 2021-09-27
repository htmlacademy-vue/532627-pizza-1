<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="misc.image" width="39" height="60" :alt="misc.name" />
      <span>{{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button
          type="button"
          class="counter__button counter__button--minus"
          @click="deleteMisc(misc.id)"
        >
          <span class="visually-hidden">Меньше</span>
        </button>

        <input
          :value="misc.quantity"
          type="text"
          name="counter"
          class="counter__input"
          readonly
        />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
          @click="addMisc(misc.id)"
        >
          <span class="visually-hidden">Больше</span>
        </button>
      </div>

      <div class="additional-list__price">
        <b>{{ misc.price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { ADD_MISC, DELETE_MISC } from "@/store/mutation.types";
export default {
  name: "CartAdditionalItem",
  props: {
    misc: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapMutations("Cart", {
      addMisc: ADD_MISC,
      deleteMisc: DELETE_MISC,
    }),
  },
};
</script>
