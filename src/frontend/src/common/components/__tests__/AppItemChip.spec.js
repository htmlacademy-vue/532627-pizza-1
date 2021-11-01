import AppItemChip from "@/common/components/AppItemChip";
import {shallowMount} from "@vue/test-utils";

describe("AppItemChip", () => {
  const slots = { default: "content" };
  const propsData = { value: "default" };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemChip, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });
});
