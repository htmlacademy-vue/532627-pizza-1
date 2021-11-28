import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, authUser, setCart } from "@/store/mocks";
import VueRouter from "vue-router";
import { LOGOUT } from "@/store/actions.types";
import build from "@/store/mocks/static/build.json";

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(VueRouter);

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $notifier: {
    success: jest.fn(),
  },
};

const stubs = ["router-link"];

describe("AppLayoutHeader", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(AppLayoutHeader, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        [LOGOUT]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render login button in non-auth state", () => {
    createComponent({ localVue, store, stubs });
    const loginBtn = wrapper.find(`[data-test="login"]`);
    expect(loginBtn.exists()).toBeTruthy();
  });

  test("'don't render login button in auth state'", () => {
    authUser(store);
    createComponent({ localVue, store, stubs });
    const loginBtn = wrapper.find(`[data-test="login"]`);
    expect(loginBtn.exists()).toBeFalsy();
  });

  test("render logout button", () => {
    authUser(store);
    createComponent({ localVue, store, stubs });
    const loginBtn = wrapper.find(`[data-test="logout"]`);
    expect(loginBtn.exists()).toBeTruthy();
  });

  test("render cart link", () => {
    authUser(store);
    createComponent({ localVue, store, stubs });
    const cartLink = wrapper.find(`[data-test="cart-link"]`);
    expect(cartLink.exists()).toBeTruthy();
  });

  test("logout by btn click", async () => {
    authUser(store);
    createComponent({ localVue, store, stubs, router });
    const logoutBtn = wrapper.find(`[data-test="logout"]`);
    await logoutBtn.trigger("click");
    expect(actions.Auth[LOGOUT]).toHaveBeenCalled();
  });

  test("render '0' in cart link", () => {
    authUser(store);
    createComponent({ localVue, store, stubs });
    const cartLink = wrapper.find(`[data-test="cart-link"]`);
    expect(cartLink.text()).toBe("0 ₽");
  });

  test("render empty cart state in cart link", () => {
    authUser(store);
    createComponent({ localVue, store, stubs });
    const cartLink = wrapper.find(`[data-test="cart-link"]`);
    expect(cartLink.text()).toBe("0 ₽");
  });

  test("render total price in cart link", () => {
    authUser(store);
    setCart(store, build, true);
    createComponent({ localVue, store, stubs });

    const cartLink = wrapper.find(`[data-test="cart-link"]`);
    const buildSumm = store.getters["Cart/getTotal"];

    expect(cartLink.text()).toBe(`${buildSumm} ₽`);
  });
});
