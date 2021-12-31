import { shallowMount } from "@vue/test-utils";
import CartThanksForOrder from "@/modules/cart/CartThanksForOrder";
import { authUser, generateMockStore, unAuthUser } from "@/store/mocks";

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

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
      store,
    });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("link at logged state", async () => {
    authUser(store);
    createComponent({ store, mocks });
    const backLink = wrapper.findComponent({ ref: "back-link" });
    await backLink.vm.$emit("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/orders");
  });

  test("link at unlogged state", async () => {
    createComponent({ store, mocks });
    const backLink = wrapper.findComponent({ ref: "back-link" });
    await backLink.vm.$emit("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
