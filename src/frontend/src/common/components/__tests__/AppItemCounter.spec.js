import { shallowMount } from "@vue/test-utils";
import AppItemCounter from "@/common/components/AppItemCounter";

describe("AppItemCounter", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemCounter, options);
  };

  beforeEach(() => {
    propsData = {
      value: 7,
      maxValue: 8,
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("There is emits an change event when click by button minus", async () => {
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button--minus"]`);
    await btnMinus.trigger("click");
    expect(wrapper.emitted("change")).toBeTruthy();
  });

  test("There is emits the input value when click by button minus", async () => {
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button--minus"]`);
    await btnMinus.trigger("click");
    expect(wrapper.emitted("change")[0][0]).toEqual(propsData.value - 1);
  });

  test("There is emits an change event when click by button plus", async () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button--plus"]`);
    await btnPlus.trigger("click");
    expect(wrapper.emitted("change")).toBeTruthy();
  });

  test("There is emits the input value when click by button plus", async () => {
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button--plus"]`);
    await btnPlus.trigger("click");
    expect(wrapper.emitted("change")[0][0]).toEqual(propsData.value + 1);
  });

  test("There is emits an change event when typing in input", async () => {
    createComponent({ propsData });
    const input = wrapper.find("input");
    input.element.value = "8";
    await input.trigger("input", { value: 1 });
    expect(wrapper.emitted("change")[0][0]).toEqual(8);
  });

  test("There is disabling minus button, if value = 0", async () => {
    propsData.value = 0;
    createComponent({ propsData });
    const btnMinus = wrapper.find(`[data-test="button--minus"]`);
    expect(btnMinus.attributes("disabled")).toBeTruthy();
  });

  test("There is disabling plus button, if value >= max", () => {
    propsData.value = propsData.maxValue;
    createComponent({ propsData });
    const btnPlus = wrapper.find(`[data-test="button--plus"]`);
    expect(btnPlus.attributes("disabled")).toBeTruthy();
  });
});
