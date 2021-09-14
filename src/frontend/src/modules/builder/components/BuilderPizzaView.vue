<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop @drop="onConstructorDrop($event)">
        <div :class="`pizza--foundation--${size}-${sauceValue}`" class="pizza">
          <div class="pizza__wrapper">
            <template v-for="ingredient in checkedIngredients">
              <div
                :key="ingredient.id"
                :class="`pizza__filling--${ingredient.value}`"
                class="pizza__filling"
              />
            </template>
          </div>
        </div>
      </AppDrop>
    </div>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { SET_PIZZA_NAME, CHANGE_INGREDIENTS } from "@/store/mutation-types";
import { mapGetters, mapMutations } from "vuex";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },

  computed: {
    ...mapGetters("Builder", {
      checkedIngredients: "checkedIngredients",
      sauceValue: "getSauceValue",
      pizzaName: "getPizzaName",
      doughValue: "getDoughValue",
    }),

    size() {
      return this.doughValue === "light" ? "small" : "big";
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaName: SET_PIZZA_NAME,
      changeIngredients: CHANGE_INGREDIENTS,
    }),
    onConstructorDrop(event) {
      this.changeIngredients({
        value: event.value,
        count: event.count + 1,
      });
    },
  },
};
</script>
