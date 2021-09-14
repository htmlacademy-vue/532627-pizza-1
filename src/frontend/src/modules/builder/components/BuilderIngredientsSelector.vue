<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingridients">
        <div class="ingridients__sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in sauceList"
            :key="sauce.value"
            :item-value="sauce.value"
            :checked="sauce.value === sauceValue"
            name="sauce"
            class="radio ingridients__input"
            @change="setSauceValue"
          >
            <template #name>
              <span>{{ sauce.name }}</span>
            </template>
          </AppRadioButton>
        </div>

        <div
          v-if="ingredientList && ingredientList.length > 0"
          class="ingridients__filling"
        >
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredientList"
              :key="ingredient.name"
              class="ingridients__item"
            >
              <AppDrag
                :draggable="ingredient.count < $options.INGREDIENTS_MAX_VALUE"
                :transfer-data="ingredient"
              >
                <AppItemChip :value="ingredient.value">
                  {{ ingredient.name }}
                </AppItemChip>
              </AppDrag>

              <AppItemCounter
                :value="ingredient.count"
                :max-value="$options.INGREDIENTS_MAX_VALUE"
                class="ingridients__counter"
                @change="
                  changeIngredients({ value: ingredient.value, count: $event })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_SAUCE, CHANGE_INGREDIENTS } from "@/store/mutation-types";
import { mapGetters, mapMutations } from "vuex";
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
  INGREDIENTS_MAX_VALUE: 3,

  computed: {
    ...mapGetters("Builder", {
      sauceValue: "getSauceValue",
      sauceList: "getSauceList",
      ingredientList: "getIngredientList",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      setSauceValue: SET_SAUCE,
      changeIngredients: CHANGE_INGREDIENTS,
    }),
  },
};
</script>
