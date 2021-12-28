<template>
  <div class="content__pizza">
    <label class="input">
      <AppInput
        :value="pizzaName"
        name="pizza_name"
        data-test="pizza-view-name"
        placeholder="Введите название пиццы"
        @input="setPizzaName($event)"
      >
        Название пиццы
      </AppInput>
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
                  :class="{
                    [`pizza__filling--${ingredient.value}`]: ingredient.value,
                    'pizza__filling--second': ingredient.count === 2,
                    'pizza__filling--third': ingredient.count === 3,
                  }"
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
import AppInput from "@/common/components/AppInput";

export default {
  name: "BuilderPizzaView",
  components: {
    AppInput,
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

<style lang="scss" scoped>
.pizza {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  &--foundation--big-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }
  &--foundation--big-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }
  &--foundation--small-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }
  &--foundation--small-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }
}
.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}
.pizza__filling {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  &--second {
    transform: rotate(45deg);
  }
  &--third {
    transform: rotate(-45deg);
  }
  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }
  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }
  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }
  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }
  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }
  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }
  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }
  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }
  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }
  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }
  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }
  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }
  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }
  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }
  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
.ingredients-enter-active,
.ingredients-leave-active {
  transition: 0.5s;
}
.ingredients-enter,
.ingredients-leave-to {
  transform: scale(1.1);
  opacity: 0;
}
</style>
