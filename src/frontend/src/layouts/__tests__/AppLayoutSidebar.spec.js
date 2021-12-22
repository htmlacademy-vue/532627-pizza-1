import { shallowMount } from "@vue/test-utils";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar";

const stubs = ["router-link"];

describe("AppLayoutSidebar", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppLayoutSidebar, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render layout", () => {
    createComponent({ stubs });
    expect(wrapper.exists()).toBeTruthy();
  });
});
