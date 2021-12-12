import { shallowMount } from "@vue/test-utils";
import CartTitle from "@/modules/cart/CartTitle";

describe("CartTitle", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(CartTitle, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render component", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });
});
