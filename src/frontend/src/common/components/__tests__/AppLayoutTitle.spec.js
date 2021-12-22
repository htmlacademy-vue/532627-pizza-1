import AppLayoutTitle from "@/common/components/AppLayoutTitle";
import { shallowMount } from "@vue/test-utils";

describe("AppItemChip", () => {
  const slots = { default: "content" };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutTitle, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  it("renders out the slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
