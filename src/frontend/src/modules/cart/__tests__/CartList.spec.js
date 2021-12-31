import CartList from "@/modules/cart/CartList";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore, setBuild, setCart } from "@/store/mocks";
import build from "@/store/mocks/static/build.json";
import {
  CREATE_CART,
  DECREASE_PIZZA_QUANTITY,
  EDIT_PIZZA,
  INCREASE_PIZZA_QUANTITY,
} from "@/store/actions.types";
import cart from "@/modules/cart/store";
import VueRouter from "vue-router";
import AppItemCounter from "@/common/components/AppItemCounter";
const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(VueRouter);

describe("CartList", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartList, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        [DECREASE_PIZZA_QUANTITY]: jest.fn(),
        [INCREASE_PIZZA_QUANTITY]: jest.fn(),
        [CREATE_CART]: cart.actions[CREATE_CART],
      },
      Builder: {
        [EDIT_PIZZA]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render current quantity cart items", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaList = wrapper.findAll("[data-test='cart-item']");
    expect(pizzaList).toHaveLength(1);
  });

  test("render pizza item name", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaName = wrapper.find("[data-test='cart-item-name']");
    expect(pizzaName.text()).toBe(build.name);
  });

  test("render pizza item size and dough", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaSizeAndDough = wrapper.find(
      "[data-test='cart-item-size-dough']"
    );
    expect(pizzaSizeAndDough.text()).toBe("32 см, на толстом тесте");
  });

  test("render pizza item sauce", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaSauce = wrapper.find("[data-test='cart-item-sauce']");
    expect(pizzaSauce.text()).toBe("сливочный");
  });

  test("render pizza item ingredients", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaIngredients = wrapper.find(
      "[data-test='cart-item-ingredients']"
    );
    expect(pizzaIngredients.text()).toBe("грибы");
  });

  test("decrease pizza item quantity", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaItemCounter = wrapper.findComponent(AppItemCounter);
    const pizzaId = store.getters["Cart/getCart"]?.[0]?.id;
    await pizzaItemCounter.vm.$emit("change", 0);
    expect(actions.Cart[DECREASE_PIZZA_QUANTITY]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: pizzaId,
        quantity: 0,
      }
    );
  });

  test("increase pizza item quantity", async () => {
    createComponent({ store });
    await setCart(store, build, true);
    const pizzaItemCounter = wrapper.findComponent(AppItemCounter);
    const pizzaId = store.getters["Cart/getCart"]?.[0]?.id;
    await pizzaItemCounter.vm.$emit("change", 2);
    expect(actions.Cart[INCREASE_PIZZA_QUANTITY]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        id: pizzaId,
        quantity: 2,
      }
    );
  });

  test("render pizza item total price", async () => {
    createComponent({ store });
    setBuild(store, build);
    const buildSumm = await store.getters["Builder/totalSum"];

    await setCart(store, build, true);
    const pizzaTotalPrice = wrapper.find("[data-test='cart-item-total-price']");
    expect(pizzaTotalPrice.text()).toBe(String(buildSumm));
  });

  test("call edit pizza func", async () => {
    createComponent({ localVue, router, store });
    await setCart(store, build, true);
    const pizzaItemChangeBtn = wrapper.find("[data-test='pizza-item-change']");
    await pizzaItemChangeBtn.trigger("click");
    expect(actions.Builder[EDIT_PIZZA]).toHaveBeenCalled();
  });
});
