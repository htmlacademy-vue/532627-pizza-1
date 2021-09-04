<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="misc.image" width="39" height="60" :alt="misc.name" />
      <span>{{ misc.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <div class="counter additional-list__counter">
        <button type="button" class="counter__button counter__button--minus">
          <span class="visually-hidden">Меньше</span>
        </button>

        <input type="text" name="counter" class="counter__input" value="2" />

        <button
          type="button"
          class="counter__button counter__button--plus counter__button--orange"
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
export default {
  name: "CartAdditionalItem",
  props: {
    misc: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
