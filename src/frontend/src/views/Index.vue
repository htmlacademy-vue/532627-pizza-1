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
                  'dough__input--light': dough.type === 'light',
                  'dough__input--large': dough.type === 'large',
                }"
                class="dough__input"
              >
                <input
                  :value="dough.type"
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
                  'diameter__input--small': size.type === 'small',
                  'diameter__input--normal': size.type === 'normal',
                  'diameter__input--normal': size.type === 'big',
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
                        'filling--mushrooms': ingredient.type === 'mushrooms',
                        'filling--cheddar': ingredient.type === 'cheddar',
                        'filling--salami': ingredient.type === 'salami',
                        'filling--ham': ingredient.type === 'ham',
                        'filling--ananas': ingredient.type === 'ananas',
                        'filling--bacon': ingredient.type === 'bacon',
                        'filling--onion': ingredient.type === 'onion',
                        'filling--chile': ingredient.type === 'chile',
                        'filling--jalapeno': ingredient.type === 'jalapeno',
                        'filling--olives': ingredient.type === 'olives',
                        'filling--tomatoes': ingredient.type === 'tomatoes',
                        'filling--salmon': ingredient.type === 'salmon',
                        'filling--mozzarella': ingredient.type === 'mozzarella',
                        'filling--parmesan': ingredient.type === 'parmesan',
                        'filling--blue_cheese':
                          ingredient.type === 'blue_cheese',
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

export default {
  name: "Index",
  data() {
    return {
      doughList,
      sizes,
      sauces,
      ingredients,
    };
  },
};
</script>
