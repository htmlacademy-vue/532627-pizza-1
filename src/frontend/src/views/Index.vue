<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div v-if="doughList && doughList.length > 0" class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <RadioButton
                v-for="dough in doughList"
                :key="dough.name"
                name="dough"
                :item-value="dough.value"
                :class="{
                  'dough__input--light': dough.value === 'light',
                  'dough__input--large': dough.value === 'large',
                }"
                class="dough__input"
              >
                <template #name>
                  <b> {{ dough.name }}</b>
                </template>

                <template #description>
                  <span>{{ dough.description }}</span>
                </template>
              </RadioButton>
            </div>
          </div>
        </div>

        <div v-if="sizes && sizes.length > 0" class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <RadioButton
                v-for="size in sizes"
                :key="size.name"
                :item-value="size.value"
                name="diameter"
                :class="{
                  'diameter__input--small': size.value === 'small',
                  'diameter__input--normal': size.value === 'normal',
                  'diameter__input--normal': size.value === 'big',
                }"
                class="diameter__input"
              >
                <template #name>
                  <span>{{ size.name }}</span>
                </template>
              </RadioButton>
            </div>
          </div>
        </div>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <div
                v-if="sauces && sauces.length > 0"
                class="ingridients__sauce"
              >
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

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
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

import RadioButton from "@/common/components/RadioButton";
import ItemCounter from "@/common/components/ItemCounter";
import ItemChip from "@/common/components/ItemChip";

export default {
  name: "Index",
  components: { ItemChip, RadioButton, ItemCounter },
  data() {
    return {
      doughList: doughList.map((item) => getValueByName(item, DOUGH_TYPES)),
      sizes: sizes.map((item) => getValueByName(item, SIZE_TYPES)),
      sauces: sauces.map((item) => getValueByName(item, SAUCE_TYPES)),
      ingredients: ingredients.map((item) =>
        getValueByName(item, INGREDIENT_TYPES)
      ),
    };
  },
};
</script>
