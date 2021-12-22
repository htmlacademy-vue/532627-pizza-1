import { shallowMount } from "@vue/test-utils";
import AppDefaultLayout from "@/layouts/AppDefaultLayout";

describe("AppDefaultLayout", () => {
  let wrapper;
  let slots = {
    default: "content",
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppDefaultLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });
});
