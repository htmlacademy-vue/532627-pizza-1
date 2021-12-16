import CartFooter from "@/modules/cart/CartFooter";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setCart, setOrderData } from "@/store/mocks";
import build from "@/store/mocks/static/build.json";

const localVue = createLocalVue();
const stubs = ["router-link"];
const phone = "+79999999999";
const address = null;

describe("CartFooter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartFooter, options);
  };

  beforeEach(() => {
    actions = {};
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render total", async () => {
    createComponent({ localVue, store, stubs });
    await setCart(store, build, true);
    const totalBlock = wrapper.find("[data-test='cart-total']");
    expect(Number(totalBlock.text())).toBeGreaterThan(0);
  });

  test("call submit order", async () => {
    createComponent({ localVue, store, stubs });
    await setCart(store, build, true);
    await setOrderData(store, phone, address);
    const sbmButton = wrapper.find("[data-test='cart-submit']");
    await sbmButton.trigger("click");
    expect(wrapper.emitted("submit")).toBeTruthy();
  });

  test("disable submit when submitted", async () => {
    createComponent({ localVue, store, stubs });
    await setCart(store, build, true);
    await setOrderData(store, phone, address);
    const sbmButton = wrapper.find("[data-test='cart-submit']");
    await sbmButton.trigger("click");
    expect(sbmButton.attributes().disabled).toEqual("disabled");
  });

  test("disable submit when non valid order data", async () => {
    createComponent({ localVue, store, stubs });
    await setCart(store, build, true);
    await setOrderData(store, "", {});
    const sbmButton = wrapper.find("[data-test='cart-submit']");
    await sbmButton.trigger("click");
    expect(sbmButton.attributes().disabled).toEqual("disabled");
  });
});
