<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        data-test="pizza-view-name"
        @input="setPizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop @drop="onConstructorDrop($event)">
        <div
          data-test="pizza-view"
          :class="`pizza--foundation--${size}-${sauceValue}`"
          class="pizza"
        >
          <div class="pizza__wrapper">
            <transition-group name="drop" mode="out-in">
              <template v-for="ingredient in checkedIngredients">
                <div
                  :key="ingredient.id"
                  :class="`pizza__filling--${ingredient.value}`"
                  class="pizza__filling"
                />
              </template>
            </transition-group>
          </div>
        </div>
      </AppDrop>
    </div>

    <BuilderPriceCounter />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
import { CHANGE_NAME, CHANGE_INGREDIENTS } from "@/store/actions.types";

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
    ...mapActions("Builder", {
      setPizzaName: CHANGE_NAME,
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

<style lang="scss" scoped>
.drop-enter-active {
  animation: drop 300ms;
}

@keyframes drop {
  0% {
    opacity: 10%;
  }
  25% {
    opacity: 30%;
  }
  50% {
    opacity: 50%;
  }
  75% {
    opacity: 75%;
  }
  100% {
    opacity: 100%;
  }
}
</style>
