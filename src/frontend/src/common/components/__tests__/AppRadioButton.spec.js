import { shallowMount } from "@vue/test-utils";
import AppRadioButton from "@/common/components/AppRadioButton";

describe("AppItemCounter", () => {
  const slots = {
    name: "content",
    description: "description",
  };
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = shallowMount(AppRadioButton, options);
  };

  beforeEach(() => {
    propsData = {
      name: "diameter",
      itemValue: "15",
      checked: false,
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render #name slot", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.name);
  });

  test("render #description slot", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.description);
  });

  test("emit change value", () => {
    createComponent({ slots, propsData });
    const radioInput = wrapper.find("[data-test='radio-input']");
    radioInput.trigger("change");
    expect(wrapper.emitted("change")[0][0]).toEqual(propsData.itemValue);
  });
});
