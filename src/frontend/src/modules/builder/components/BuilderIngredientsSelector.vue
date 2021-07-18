<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <RadioButton
            v-for="sauce in sauces"
            :key="sauce.value"
            :item-value="sauce.value"
            name="sauce"
            class="radio ingridients__input"
          >
            <template #name>
              <span>{{ sauce.name }}</span>
            </template>
          </RadioButton>
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
              <ItemChip :value="ingredient.value">
                {{ ingredient.name }}
              </ItemChip>

              <ItemCounter class="ingridients__counter" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemChip from "@/common/components/ItemChip";
import ItemCounter from "@/common/components/ItemCounter";
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    ItemChip,
    RadioButton,
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
  },
};
</script>
