import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore, setBuild } from "@/store/mocks";
import build from "@/store/mocks/static/build.json";
import { CHANGE_INGREDIENTS, CHANGE_SAUCE } from "@/store/actions.types";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import sauceList from "@/static/sauces.json";
import { SAUCE_TYPES } from "@/common/constants";
import { getValueByName } from "@/common/helpers";
const localVue = createLocalVue();

describe("BuilderIngredientsSelector", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderIngredientsSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        [CHANGE_INGREDIENTS]: jest.fn(),
        [CHANGE_SAUCE]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render sauce list", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    await localVue.nextTick();
    const sauceList = wrapper.findAll("[data-test='sauce-item']");
    expect(sauceList).toHaveLength(
      store.getters["Builder/getSauceList"]?.length
    );
  });

  test("change sauce value", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    await localVue.nextTick();
    const sauceInput = wrapper.find(`[data-test="sauce-item"]`);
    const sauceValue = getValueByName(sauceList[0], SAUCE_TYPES);
    await sauceInput.vm.$emit("change", sauceValue);
    expect(actions.Builder[CHANGE_SAUCE]).toHaveBeenLastCalledWith(
      expect.any(Object),
      sauceValue
    );
  });

  test("change ingredient value", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    await localVue.nextTick();
    const ingredientInput = wrapper.find(
      `[data-test="ingredient-item-counter"]`
    );
    const ingredientValue = build.ingredients[0];
    await ingredientInput.vm.$emit("change", ingredientValue.count + 1);
    expect(actions.Builder[CHANGE_INGREDIENTS]).toHaveBeenLastCalledWith(
      expect.any(Object),
      { value: ingredientValue.value, count: ingredientValue.count + 1 }
    );
  });

  test("render ingridients list", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    await localVue.nextTick();
    const ingredientList = wrapper.findAll("[data-test='ingredient-item']");
    expect(ingredientList).toHaveLength(
      store.getters["Builder/getIngredientList"]?.length
    );
  });
});
