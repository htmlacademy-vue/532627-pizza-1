<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <AppRadioButton
            v-for="sauce in sauceList"
            :key="sauce.value"
            :item-value="sauce.value"
            :checked="sauce.value === sauceValue"
            data-test="sauce-item"
            name="sauce"
            class="radio ingredients__input"
            @change="changeSauce"
          >
            <template #name>
              <span>{{ sauce.name }}</span>
            </template>
          </AppRadioButton>
        </div>

        <div
          v-if="ingredientList && ingredientList.length > 0"
          class="ingredients__filling"
        >
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredientList"
              :key="ingredient.name"
              data-test="ingredient-item"
              class="ingredients__item"
            >
              <AppDrag
                :draggable="ingredient.count < 3"
                :transfer-data="ingredient"
              >
                <AppItemChip :value="ingredient.value">
                  {{ ingredient.name }}
                </AppItemChip>
              </AppDrag>

              <AppItemCounter
                :value="ingredient.count"
                :max-value="3"
                data-test="ingredient-item-counter"
                class="ingredients__counter"
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
import { mapGetters, mapActions } from "vuex";
import AppItemChip from "@/common/components/AppItemChip";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppRadioButton from "@/common/components/AppRadioButton";
import AppDrag from "@/common/components/AppDrag";
import { CHANGE_INGREDIENTS, CHANGE_SAUCE } from "@/store/actions.types";

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
    ...mapActions("Builder", {
      changeIngredients: CHANGE_INGREDIENTS,
      changeSauce: CHANGE_SAUCE,
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "~@/assets/scss/mixins/m_clear-list.scss";
@import "~@/assets/scss/mixins/m_center.scss";
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}
.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
.ingredients__filling {
  width: 100%;
  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-bottom: 16px;
  }
}
.ingredients__list {
  @include clear-list;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}
.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
.filling {
  @include r-s14-h16;
  position: relative;
  display: block;
  padding-left: 36px;
  &::before {
    @include p_center-v;
    display: block;
    width: 32px;
    height: 32px;
    content: "";
    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
  }
  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }
  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }
  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }
  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }
  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }
  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }
  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }
  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }
  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }
  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }
  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }
  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }
  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }
  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }
  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}
</style>
