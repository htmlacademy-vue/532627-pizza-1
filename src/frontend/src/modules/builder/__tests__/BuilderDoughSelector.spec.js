import { createLocalVue, mount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import Vuex from "vuex";
import { generateMockStore } from "@/store/mocks";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("BuilderDoughSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderDoughSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        setDough: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render dough selector", () => {
    createComponent({ localVue, store });
  });

  test("set dough", () => {
    createComponent({ localVue, store });
  });
});
