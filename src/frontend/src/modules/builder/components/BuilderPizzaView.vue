<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>

    <BuilderPriceCounter :total="total" :disabled="disabled" />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
export default {
  name: "BuilderPizzaView",
  components: { BuilderPriceCounter },
  props: {
    total: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    pizzaName: {
      type: String,
      default: "",
    },
  },
};
</script>
