import { shallowMount } from "@vue/test-utils";
import AppLayout from "@/layouts/AppLayout";

describe("AppLayout", () => {
  let wrapper;

  const mocks = {
    $route: {
      meta: {
        layout: "",
      },
    },
  };

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayout, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render slot content", () => {
    createComponent({ mocks });
    expect(wrapper.exists()).toBe(true);
  });
});
