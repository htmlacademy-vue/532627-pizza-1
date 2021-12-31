import { shallowMount } from "@vue/test-utils";
import AppButton from "@/common/components/AppButton";

describe("AppButton", () => {
  const slots = { default: "content" };
  const defaultBtnType = "button";
  let propsData;
  const listeners = { click: null };
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppButton, options);
  };

  beforeEach(() => {
    propsData = { type: "submit" };
    listeners.click = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render slot content", () => {
    createComponent({ slots });
    expect(wrapper.html()).toContain(slots.default);
  });

  it("raises the click event on click", async () => {
    createComponent({ listeners });
    await wrapper.find("button").trigger("click");
    expect(listeners.click).toHaveBeenCalled();
  });

  it("button type is button", () => {
    createComponent();
    expect(wrapper.attributes("type")).toBe(defaultBtnType);
  });

  it("button type is submit", () => {
    createComponent({ propsData });
    expect(wrapper.attributes("type")).toBe(propsData.type);
  });
});
