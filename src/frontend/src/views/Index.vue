<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div v-if="doughList && doughList.length > 0" class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="dough in doughList"
                :key="dough.name"
                :class="{
                  'dough__input--light': dough.value === 'light',
                  'dough__input--large': dough.value === 'large',
                }"
                class="dough__input"
              >
                <input
                  :value="dough.value"
                  type="radio"
                  name="dought"
                  class="visually-hidden"
                />
                <b> {{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div v-if="sizes && sizes.length > 0" class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="size.name"
                :class="{
                  'diameter__input--small': size.value === 'small',
                  'diameter__input--normal': size.value === 'normal',
                  'diameter__input--normal': size.value === 'big',
                }"
                class="diameter__input"
              >
                <input
                  type="radio"
                  name="diameter"
                  value="small"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
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

                <label
                  v-for="sauce in sauces"
                  :key="sauce.value"
                  class="radio ingridients__input"
                >
                  <input type="radio" name="sauce" :value="sauce.value" />
                  <span>{{ sauce.name }}</span>
                </label>
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
                    <span
                      :class="{
                        'filling--mushrooms': ingredient.value === 'mushrooms',
                        'filling--cheddar': ingredient.value === 'cheddar',
                        'filling--salami': ingredient.value === 'salami',
                        'filling--ham': ingredient.value === 'ham',
                        'filling--ananas': ingredient.value === 'ananas',
                        'filling--bacon': ingredient.value === 'bacon',
                        'filling--onion': ingredient.value === 'onion',
                        'filling--chile': ingredient.value === 'chile',
                        'filling--jalapeno': ingredient.value === 'jalapeno',
                        'filling--olives': ingredient.value === 'olives',
                        'filling--tomatoes': ingredient.value === 'tomatoes',
                        'filling--salmon': ingredient.value === 'salmon',
                        'filling--mozzarella':
                          ingredient.value === 'mozzarella',
                        'filling--parmesan': ingredient.value === 'parmesan',
                        'filling--blue_cheese':
                          ingredient.value === 'blue_cheese',
                      }"
                      class="filling"
                    >
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingridients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--disabled
                          counter__button--minus
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
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

export default {
  name: "Index",
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
