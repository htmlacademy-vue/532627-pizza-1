import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { createLocalVue, mount } from "@vue/test-utils";

const localVue = createLocalVue();

describe("BuilderPizzaView", () => {
  let wrapper;
  let actions;
  let store;
  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  afterEach(() => {
    wrapper.destroy();
  });


});
