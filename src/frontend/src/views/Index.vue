<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          v-if="doughList && doughList.length > 0"
          :value="doughValue"
          :dough-list="doughList"
          @change="doughValue = $event"
        />

        <BuilderSizeSelector
          v-if="sizes && sizes.length > 0"
          :value="sizeValue"
          :sizes="sizes"
          @change="sizeValue = $event"
        />

        <BuilderIngredientsSelector
          v-if="isShowIngredientsBuilder"
          :sauce-value="sauceValue"
          :sauces="sauces"
          :ingredients="ingredients"
          @change="onIngredientChange"
          @change-sauce="sauceValue = $event"
        />

        <BuilderPizzaView
          :ingredients="checkedIngredients"
          :sauce="sauceValue"
          :dough="doughValue"
          :total="totalSum"
          :pizza-name="pizzaName"
          :disabled="isDisabledSubmit"
          @drop="onIngredientChange"
          @input-name="pizzaName = $event"
        />
      </div>
    </form>
  </main>
</template>

<script>
import doughList from "@/static/dough.json";
import sizes from "@/static/sizes.json";
import sauces from "@/static/sauces.json";
import ingredients from "@/static/ingredients.json";

import {
  DOUGH_TYPES,
  SIZE_TYPES,
  SAUCE_TYPES,
  INGREDIENT_TYPES,
} from "@/common/constants";

import { getValueByName } from "@/common/helpers";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";

export default {
  name: "Index",
  components: {
    BuilderSizeSelector,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderDoughSelector,
  },
  data() {
    return {
      doughValue: "light",
      sizeValue: "small",
      sauceValue: "tomato",
      pizzaName: "",
      doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
      sizes: sizes.map((item) => getValueByName(item, SIZE_TYPES)),
      sauces: sauces.map((item) => getValueByName(item, SAUCE_TYPES)),
      ingredients: ingredients.map((item) => {
        return { ...getValueByName(item, INGREDIENT_TYPES), count: 0 };
      }),
    };
  },
  computed: {
    isShowIngredientsBuilder() {
      return this.sauces?.length > 0 && this.ingredients?.length > 0;
    },
    isDisabledSubmit() {
      return !(this.checkedIngredients.length && this.pizzaName);
    },
    totalSum() {
      const doughPrice = this.doughList.find(
        (item) => item.value === this.doughValue
      )?.price;

      const saucePrice = this.sauces.find(
        (item) => item.value === this.sauceValue
      )?.price;

      const sizeMultiplier = this.sizes.find(
        (item) => item.value === this.sizeValue
      )?.multiplier;

      const ingredientsPrice = this.checkedIngredients.reduce((acc, item) => {
        acc += item.count * item.price;
        return acc;
      }, 0);

      return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
    },
    checkedIngredients() {
      return this.ingredients.filter((ingredient) => ingredient.count > 0);
    },
  },

  methods: {
    onIngredientChange({ value, count }) {
      const currentIngredient = this.ingredients.find(
        (ingredient) => ingredient.value === value
      );

      if (currentIngredient) {
        currentIngredient.count = count;
      }
    },
  },
};
</script>
