import { shallowMount } from "@vue/test-utils";
import CartEmpty from "@/modules/cart/CartEmpty";

describe("CartEmpty", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartEmpty, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render component", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });
});
