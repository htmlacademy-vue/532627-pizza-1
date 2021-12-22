import Index from "@/views/Index";
import { shallowMount } from "@vue/test-utils";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";

describe("Index", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Index, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });

  test("render view", () => {
    createComponent({});
    expect(wrapper.exists()).toBeTruthy();
  });

  test("render BuilderDoughSelector component", () => {
    createComponent();
    const builderDoughSelector = wrapper.findComponent(BuilderDoughSelector);
    expect(builderDoughSelector.exists()).toBeTruthy();
  });

  test("render BuilderSizeSelector component", () => {
    createComponent();
    const builderSizeSelector = wrapper.findComponent(BuilderSizeSelector);
    expect(builderSizeSelector.exists()).toBeTruthy();
  });

  test("render BuilderIngredientsSelector component", () => {
    createComponent();
    const builderIngredientsSelector = wrapper.findComponent(
      BuilderIngredientsSelector
    );
    expect(builderIngredientsSelector.exists()).toBeTruthy();
  });

  test("render BuilderPizzaView component", () => {
    createComponent();
    const builderPizzaView = wrapper.findComponent(BuilderPizzaView);
    expect(builderPizzaView.exists()).toBeTruthy();
  });
});
