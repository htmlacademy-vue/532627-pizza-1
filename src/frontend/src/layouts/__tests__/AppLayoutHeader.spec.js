import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import { mount, createLocalVue } from "@vue/test-utils";
import AppDefaultLayout from "@/layouts/AppDefaultLayout";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

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
    wrapper = mount(AppDefaultLayout, options);
  };

  beforeEach(() => {
    actions = {
      Auth: {
        logout: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    mocks.$notifier.success = jest.fn();
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("is rendered", () => {
    createComponent({ localVue, store, stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
