import CartAdditionalItem from "@/modules/cart/CartAdditionalItem";
import { mount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { UPDATE_MISC } from "@/store/actions.types";

describe("CartAdditionalItem", () => {
  let wrapper;
  let actions;
  let store;

  const propsData = {
    misc: {
      id: 2,
      name: "Cola-Cola 0,5 литра",
      image: "/public/img/cola.svg",
      price: 56,
      quantity: 1,
    },
  };

  const createComponent = (options) => {
    wrapper = mount(CartAdditionalItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        [UPDATE_MISC]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render misc image", () => {
    createComponent({ propsData });
    const img = wrapper.find("[data-test='misc-image']");
    expect(img).toBeTruthy();
  });

  test("render misc name", () => {
    createComponent({ propsData });
    const name = wrapper.find("[data-test='misc-name']");
    expect(name.text()).toBe(propsData.misc.name);
  });

  test("call delete misc", async () => {
    createComponent({ propsData, store });
    const minusBtn = wrapper.find("[data-test='misc-minus']");
    await minusBtn.trigger("click");
    expect(actions.Cart[UPDATE_MISC]).toHaveBeenCalledWith(expect.any(Object), {
      id: propsData.misc.id,
      quantity: propsData.misc.quantity - 1,
    });
  });

  test("render misc quantity", () => {
    createComponent({ propsData });
    const quantity = wrapper.find("[data-test='misc-quantity']").element.value;
    expect(quantity).toBe(String(propsData.misc.quantity));
  });

  test("call add misc", async () => {
    createComponent({ propsData, store });
    const minusBtn = wrapper.find("[data-test='misc-plus']");
    await minusBtn.trigger("click");
    expect(actions.Cart[UPDATE_MISC]).toHaveBeenCalledWith(expect.any(Object), {
      id: propsData.misc.id,
      quantity: propsData.misc.quantity + 1,
    });
  });

  test("render misc price", () => {
    createComponent({ propsData });
    const price = wrapper.find("[data-test='misc-price']");
    expect(price.text()).toBe(String(propsData.misc.price));
  });
});
