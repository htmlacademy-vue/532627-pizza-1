import { shallowMount } from "@vue/test-utils";
import CartThanksForOrder from "@/modules/cart/CartThanksForOrder";
import { authUser, generateMockStore, unAuthUser } from "@/store/mocks";

const stubs = ["router-link"];

describe("CartThanksForOrder", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(CartThanksForOrder, options);
  };

  beforeEach(() => {
    actions = {};
    store = generateMockStore(actions);
    unAuthUser(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render component", () => {
    createComponent({
      stubs,
      store,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("link at logged state", () => {
    authUser(store);
    createComponent({ stubs, store });
    const backLink = wrapper.find('[data-test="back-link"]');
    expect(backLink.attributes().to).toBe("/orders");
  });

  test("link at unlogged state", () => {
    createComponent({ stubs, store });
    const backLink = wrapper.find('[data-test="back-link"]');
    expect(backLink.attributes().to).toBe("/");
  });
});
