import { shallowMount } from "@vue/test-utils";
import Cart from "@/views/Cart";
import { generateMockStore, setCart } from "@/store/mocks";
import { CREATE_ORDER, CREATE_CART } from "@/store/actions.types";
import CartTitle from "@/modules/cart/CartTitle";
import CartFooter from "@/modules/cart/CartFooter";
import CartEmpty from "@/modules/cart/CartEmpty";
import CartList from "@/modules/cart/CartList";
import build from "@/store/mocks/static/build.json";
import cart from "@/store/modules/cart.store";
import CartAdditional from "@/modules/cart/CartAdditional";
import CartOrder from "@/modules/cart/CartOrder";
import CartThanksForOrder from "@/modules/cart/CartThanksForOrder";
import {SET_SUCCESS} from "@/store/mutation.types";

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $store: {
    dispatch: jest.fn(),
  },
};

describe("Cart", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = shallowMount(Cart, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        [CREATE_ORDER]: jest.fn(),
        [CREATE_CART]: cart.actions[CREATE_CART],
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render view", () => {
    createComponent({ store, mocks });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("render CartTitle component", () => {
    createComponent({ store, mocks });
    const cartTitle = wrapper.findComponent(CartTitle);
    expect(cartTitle.exists()).toBeTruthy();
  });

  test("render CartFooter component", () => {
    createComponent({ store, mocks });
    const cartFooter = wrapper.findComponent(CartFooter);
    expect(cartFooter.exists()).toBeTruthy();
  });

  test("render CartEmpty component if cart is empty", () => {
    createComponent({ store, mocks });
    const cartEmpty = wrapper.findComponent(CartEmpty);
    expect(cartEmpty.exists()).toBeTruthy();
  });

  test("render CartList component if cart not empty", async () =>{
    createComponent({ store, mocks });
    await setCart(store, build, true);
    const cartList = wrapper.findComponent(CartList);
    expect(cartList.exists()).toBeTruthy();
  });

  test("render CartAdditional component if cart not empty", async () => {
    createComponent({ store, mocks });
    await setCart(store, build, true);
    const cartList = wrapper.findComponent(CartAdditional);
    expect(cartList.exists()).toBeTruthy();
  });

  test("render CartOrder component if cart not empty", async () => {
    createComponent({ store, mocks });
    await setCart(store, build, true);
    const cartList = wrapper.findComponent(CartOrder);
    expect(cartList.exists()).toBeTruthy();
  });

  test("call create order action by submit", async () => {
    createComponent({ store, mocks });
    await setCart(store, build, true);
    const cartForm = wrapper.find("[data-test='cart-form']");
    await cartForm.trigger("submit");
    expect(actions.Cart[CREATE_ORDER]).toHaveBeenCalled();
  });

  test("show CartThanksForOrder component after submit order", async () => {
    createComponent({ store, mocks });
    await setCart(store, build, true);
    const cartForm = wrapper.find("[data-test='cart-form']");
    await cartForm.trigger("submit");
    await store.commit(`Cart/${SET_SUCCESS}`, true);
    const cartThanksForOrder = wrapper.findComponent(CartThanksForOrder);
    expect(cartThanksForOrder.exists()).toBeTruthy();
  });
});
