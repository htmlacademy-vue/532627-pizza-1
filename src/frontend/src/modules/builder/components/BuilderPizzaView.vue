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
      <AppDrop @drop="onConstructorDrop($event)">
        <div :class="`pizza--foundation--${size}-${sauce}`" class="pizza">
          <div class="pizza__wrapper">
            <template v-for="ingredient in ingredients">
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

    <BuilderPriceCounter :total="total" :disabled="disabled" />
  </div>
</template>

<script>
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import AppDrop from "@/common/components/AppDrop";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  props: {
    dough: {
      type: String,
      required: true,
      validator: (value) => ["light", "large"].includes(value),
    },
    sauce: {
      type: String,
      required: true,
      validator: (value) => ["tomato", "creamy"].includes(value),
    },
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
    ingredients: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    size() {
      return this.dough === "light" ? "small" : "big";
    },
  },

  methods: {
    onConstructorDrop(event) {
      this.$emit("drop", {
        value: event.value,
        count: event.count + 1,
      });
    },
  },
};
</script>
