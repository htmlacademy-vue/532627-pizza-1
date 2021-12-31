import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore, setBuild } from "@/store/mocks";
import build from "@/store/mocks/static/build.json";
import { CHANGE_INGREDIENTS, CHANGE_NAME } from "@/store/actions.types";
const localVue = createLocalVue();

describe("BuilderPizzaView", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(BuilderPizzaView, options);
  };

  beforeEach(() => {
    actions = {
      Builder: {
        [CHANGE_NAME]: jest.fn(),
        [CHANGE_INGREDIENTS]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render empty pizza name input", () => {
    createComponent({ localVue, store });
    const nameInput = wrapper.findComponent({ ref: "pizza-view-name" });
    expect(nameInput.vm.$options.propsData.value).toEqual("");
  });

  test("render pizza name", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const nameInput = await wrapper.findComponent({ ref: "pizza-view-name" });
    expect(nameInput.vm.$options.propsData.value).toEqual(build.name);
  });

  test("change pizza name on input", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const newInputValue = "example";
    const nameInput = await wrapper.findComponent({ ref: "pizza-view-name" });
    await nameInput.vm.$emit("input", newInputValue);
    expect(actions.Builder[CHANGE_NAME]).toHaveBeenLastCalledWith(
      expect.any(Object),
      newInputValue
    );
  });

  test("set pizza view size & sauce class modifiers", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const pizzaView = await wrapper.find("[data-test='pizza-view']");
    const size = build.dough === "light" ? "small" : "big";
    expect(pizzaView.classes()).toContain(
      `pizza--foundation--${size}-${build.sauce}`
    );
  });

  test("call change ingredient action on drop event", async () => {
    createComponent({ localVue, store });
    setBuild(store, build);
    const transferData = build.ingredients[0];
    const appDropElement = wrapper.findComponent({ name: "AppDrop" });
    await appDropElement.vm.$emit("drop", transferData);
    expect(actions.Builder[CHANGE_INGREDIENTS]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        value: transferData.value,
        count: transferData.count + 1,
      }
    );
  });
});
