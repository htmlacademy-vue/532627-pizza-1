import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, setCart } from "@/store/mocks";

const localVue = createLocalVue();

describe("BuilderPriceCounter", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderPriceCounter, options);
  };

  beforeEach(() => {
    actions = {
      actions: {
        addPizzaToCart: jest.fn(),
      },
      Builder: {
        createNewPizza: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("disable submit button initial", () => {
    createComponent({ localVue, store });
    const sbmButton = wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toBeTruthy();
  });

  // TODO
  // здесь и далее сделать реализацию разных кейсов в тесте (сеттим некоторые значения)
  test("disable submit button there is no pizza name", () => {
    createComponent({ localVue, store });
    const sbmButton = wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toBeTruthy();
  });

  test("disable submit button there is no pizza name and checked ingredients", () => {
    createComponent({ localVue, store });
    const sbmButton = wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toBeTruthy();
  });

  test("enable submit button there is no pizza name and checked ingredients", () => {
    createComponent({ localVue, store });
    const sbmButton = wrapper.find("[data-test='price-counter-button']");
    expect(sbmButton.attributes().disabled).toBeFalsy();
  });

  test("render total sum", () => {
    createComponent({ localVue, store });
  });

  test("call create cart action", () => {});

  test("call edit cart action", () => {});
});
