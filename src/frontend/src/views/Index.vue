<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          v-if="doughList && doughList.length > 0"
          :value="doughValue"
          :dough-list="doughList"
        />

        <BuilderSizeSelector
          v-if="sizes && sizes.length > 0"
          :value="sizeValue"
          :sizes="sizes"
        />

        <BuilderIngredientsSelector
          v-if="isShowIngredientsBuilder"
          :sauce-value="sauceValue"
          :ingredient-value="ingredientValues"
          :sauces="sauces"
          :ingredients="ingredients"
        />

        <BuilderPizzaView
          :total="totalSum"
          :pizza-name="pizzaName"
          :disabled="isDisabledSubmit"
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
      ingredients: ingredients.map((item) =>
        getValueByName(item, INGREDIENT_TYPES)
      ),
    };
  },
  computed: {
    isShowIngredientsBuilder() {
      return this.sauces?.length > 0 && this.ingredients?.length > 0;
    },
    ingredientValues() {
      //TODO
      return [];
    },
    isDisabledSubmit() {
      //TODO
      return true;
    },
    totalSum() {
      // TODO
      return 0;
    },
  },
};
</script>
