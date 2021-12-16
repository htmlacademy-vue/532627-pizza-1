import CartList from "@/modules/cart/CartList";
import { mount } from "@vue/test-utils";


describe("CartList", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = mount(CartList, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("")
})
