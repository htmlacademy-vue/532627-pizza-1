<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in sauces"
            :key="sauce.value"
            :item-value="sauce.value"
            :checked="sauce.value === sauceValue"
            name="sauce"
            class="radio ingridients__input"
          >
            <template #name>
              <span>{{ sauce.name }}</span>
            </template>
          </AppRadioButton>
        </div>

        <div
          v-if="ingredients && ingredients.length > 0"
          class="ingridients__filling"
        >
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              class="ingridients__item"
            >
              <AppDrag :draggable="true" :transfer-data="ingredient">
                <AppItemChip :value="ingredient.value">
                  {{ ingredient.name }}
                </AppItemChip>
              </AppDrag>
              <AppItemCounter
                :value="ingredient.count"
                class="ingridients__counter"
                @change="onIngredientCountChange(ingredient.value, $event)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppItemChip from "@/common/components/AppItemChip";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    AppItemCounter,
    AppItemChip,
    AppRadioButton,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    sauceValue: {
      type: String,
      default: "",
    },
  },

  methods: {
    onIngredientCountChange(value, count) {
      return this.$emit("change", {
        value,
        count,
      });
    },
  },
};
</script>
