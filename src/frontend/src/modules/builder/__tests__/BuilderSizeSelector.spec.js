import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import { mount } from "@vue/test-utils";
import { generateMockStore, setCart } from "@/store/mocks";
import { CHANGE_SIZE } from "@/store/actions.types";
import { getValueByName } from "@/common/helpers";
import sizeList from "@/static/sizes.json";
import { SIZE_TYPES } from "@/common/constants";

describe("BuilderSizeSelector", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(BuilderSizeSelector, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        [CHANGE_SIZE]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render size selector", () => {
    setCart(store);
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("change size", async () => {
    setCart(store);
    createComponent({ store });

    const sizeRadioInput = wrapper.find(`[data-test="size-radio-input"]`);
    const sizeValue = getValueByName(sizeList[0], SIZE_TYPES)?.value;

    await sizeRadioInput.vm.$emit("change", sizeValue);
    expect(actions.Builder[CHANGE_SIZE]).toHaveBeenLastCalledWith(
      expect.any(Object),
      sizeValue
    );
  });
});
