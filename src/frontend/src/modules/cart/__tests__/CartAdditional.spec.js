import CartAdditional from "@/modules/cart/CartAdditional";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore, setMisc } from "@/store/mocks";
const localVue = createLocalVue();
import misc from "@/store/mocks/static/misc.json";

describe("CartAdditional", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartAdditional, options);
  };

  beforeEach(() => {
    actions = {};
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render right amount of misc items", async () => {
    createComponent({ localVue, store });
    await setMisc(store);
    const miscItems = wrapper.findAll("[data-test='misc-item']");
    expect(miscItems).toHaveLength(misc.length);
  });
});
