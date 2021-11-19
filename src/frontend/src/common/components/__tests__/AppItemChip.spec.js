import AppItemChip from "@/common/components/AppItemChip";
import { shallowMount } from "@vue/test-utils";

describe("AppItemChip", () => {
  const slots = { default: "content" };
  const propsData = { value: "mushrooms" };

  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(AppItemChip, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  test("set class for mushrooms by value", () => {
    createComponent({ slots, propsData });
    expect(wrapper.classes("filling--mushrooms")).toBe(true);
  });

  test("set class for cheddar by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "cheddar" });
    expect(wrapper.classes("filling--cheddar")).toBe(true);
  });

  test("set class for salami by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "salami" });
    expect(wrapper.classes("filling--salami")).toBe(true);
  });

  test("set class for ham by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "ham" });
    expect(wrapper.classes("filling--ham")).toBe(true);
  });

  test("set class for ananas by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "ananas" });
    expect(wrapper.classes("filling--ananas")).toBe(true);
  });

  test("set class for bacon by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "bacon" });
    expect(wrapper.classes("filling--bacon")).toBe(true);
  });

  test("set class for onion by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "onion" });
    expect(wrapper.classes("filling--onion")).toBe(true);
  });

  test("set class for chile by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "chile" });
    expect(wrapper.classes("filling--chile")).toBe(true);
  });

  test("set class for jalapeno by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "jalapeno" });
    expect(wrapper.classes("filling--jalapeno")).toBe(true);
  });

  test("set class for olives by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "olives" });
    expect(wrapper.classes("filling--olives")).toBe(true);
  });

  test("set class for tomatoes by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "tomatoes" });
    expect(wrapper.classes("filling--tomatoes")).toBe(true);
  });

  test("set class for salmon by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "salmon" });
    expect(wrapper.classes("filling--salmon")).toBe(true);
  });

  test("set class for mozzarella by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "mozzarella" });
    expect(wrapper.classes("filling--mozzarella")).toBe(true);
  });

  test("set class for parmesan by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "parmesan" });
    expect(wrapper.classes("filling--parmesan")).toBe(true);
  });

  test("set class for blue_cheese by value", async () => {
    createComponent({ slots, propsData });
    await wrapper.setProps({ value: "blue_cheese" });
    expect(wrapper.classes("filling--blue_cheese")).toBe(true);
  });

  test("render content in the slot", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });
});
