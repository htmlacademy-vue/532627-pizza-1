<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :value="doughValue"
          :dough-list="doughList"
          @change="doughValue = $event"
        />

        <BuilderSizeSelector
          :value="sizeValue"
          :sizes="sizes"
          @change="sizeValue = $event"
        />

        <BuilderIngredientsSelector
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
import { mapGetters } from "vuex";

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

  computed: {
    ...mapGetters("Builder", [
      "checkedIngredients",
      "totalSum",
      "isDisabledSubmit",
    ]),
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
