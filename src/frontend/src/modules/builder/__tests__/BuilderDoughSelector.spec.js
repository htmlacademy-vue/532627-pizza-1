import { mount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import { generateMockStore, setCart } from "@/store/mocks";
import doughList from "@/static/dough.json";
import { getValueByName } from "@/common/helpers";
import { DOUGH_TYPES } from "@/common/constants";
import { CHANGE_DOUGH } from "@/store/actions.types";

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
        [CHANGE_DOUGH]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render dough selector", () => {
    setCart(store);
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("change dough", async () => {
    setCart(store);
    createComponent({ store });

    const doughRadioInput = wrapper.find(`[data-test="dough-radio-input"]`);
    const doughValue = getValueByName(doughList[0], DOUGH_TYPES)?.value;

    await doughRadioInput.vm.$emit("change", doughValue);
    expect(actions.Builder[CHANGE_DOUGH]).toHaveBeenLastCalledWith(
      expect.any(Object),
      doughValue
    );
  });
});
