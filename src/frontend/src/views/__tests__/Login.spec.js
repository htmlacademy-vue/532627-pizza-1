import Login from "@/views/^Login";
import { createLocalVue, mount } from "@vue/test-utils";
import { authUser, generateMockStore } from "@/store/mocks";
import { LOGIN } from "@/store/actions.types";

const localVue = createLocalVue();

const mocks = {
  $router: {
    push: jest.fn(),
  },
  $store: {
    dispatch: jest.fn(),
  },
};
describe("Login", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(Login, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        [LOGIN]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$router.push = jest.fn();
    mocks.$store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render view", () => {
    createComponent({ localVue, store });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("go to main page by closing form", async () => {
    createComponent({ localVue, store, mocks });
    const btn = wrapper.find("[data-test='login-close']");
    await btn.trigger("click");
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  test("call login action at form submit", async () => {
    createComponent({ localVue, store, mocks });
    const testEmail = "testEmail@example.com";
    const testPassword = "testPassword@example.com";

    const emailInput = wrapper.find("[data-test='login-email']");
    emailInput.element.value = testEmail;
    await emailInput.trigger("input");

    const passwordInput = wrapper.find("[data-test='login-password']");
    passwordInput.element.value = testPassword;
    await passwordInput.trigger("input");

    const form = wrapper.find("[data-test='login-form']");
    await form.trigger("submit");
    expect(actions.Auth[LOGIN]).toHaveBeenCalledWith(expect.any(Object), {
      email: testEmail,
      password: testPassword,
    });
  });

  test("go to main page when logged in", async () => {
    createComponent({ localVue, store, mocks });
    await authUser(store);
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });
});
