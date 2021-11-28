import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setBuild } from "@/store/mocks";
import build from "@/store/mocks/static/build.json";
import { CREATE_CART, EDIT_CART_PIZZA } from "@/store/actions.types";
const localVue = createLocalVue();
import VueRouter from "vue-router";

const router = new VueRouter();

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

localVue.use(VueRouter);

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        [CREATE_CART]: jest.fn(),
        [EDIT_CART_PIZZA]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("disable submit button initial", () => {
    createComponent({ localVue, store });
    const sbmButton = wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toEqual("disabled");
  });

  test("disable submit button there is no pizza name", async () => {
    createComponent({ localVue, store });
    const buildWithoutPizzaName = { ...build, name: "" };
    setBuild(store, buildWithoutPizzaName);
    const sbmButton = await wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toEqual("disabled");
  });

  test("disable submit button there is no checked ingredients", async () => {
    createComponent({ localVue, store });
    const buildWithoutIngredients = {
      ...build,
      name: "pizza",
      ingredients: [],
    };
    setBuild(store, buildWithoutIngredients);
    const sbmButton = await wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toEqual("disabled");
  });

  test("enable submit button there is pizza name and checked ingredients", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const sbmButton = await wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toBeFalsy();
  });

  test("render total sum", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const totalSumElement = await wrapper.find(
      "[data-test='price-counter-total-sum']"
    );
    const buildSumm = await store.getters["Builder/totalSum"];
    expect(totalSumElement.text()).toBe(`Итого: ${buildSumm} ₽`);
  });

  test("call create cart action", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const sbmButton = await wrapper.find("[data-test='price-counter-button']");
    await sbmButton.trigger("click");
    expect(actions.Cart[CREATE_CART]).toHaveBeenCalled();
  });

  test("call edit cart action", async () => {
    createComponent({ localVue, store, router });
    const buildWithId = { ...build, id: 1, quantity: 1 };
    setBuild(store, buildWithId);
    const sbmButton = await wrapper.find("[data-test='price-counter-button']");
    await sbmButton.trigger("click");
    expect(actions.Cart[EDIT_CART_PIZZA]).toHaveBeenCalled();
  });
});
