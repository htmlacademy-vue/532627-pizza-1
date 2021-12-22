import CartOrder from "@/modules/cart/CartOrder";
import { mount } from "@vue/test-utils";
import { generateMockStore, setAddresses } from "@/store/mocks";
import addresses from "@/store/mocks/static/addresses.json";
import { CHANGE_ADDRESS, CHANGE_PHONE } from "@/store/actions.types";

describe("CartOrder", () => {
  let wrapper;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(CartOrder, options);
  };

  beforeEach(() => {
    actions = {
      Cart: {
        [CHANGE_PHONE]: jest.fn(),
        [CHANGE_ADDRESS]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render address list options in select", async () => {
    createComponent({ store });
    await setAddresses(store);
    const deliverySelectOptionsLength = wrapper
      .find("[data-test='cart-order-select']")
      .findAll("option").length;

    expect(deliverySelectOptionsLength).toBe(addresses.length + 2);
  });

  test("render new address form", async () => {
    createComponent({ store });
    await setAddresses(store);
    const deliverySelectOptions = wrapper
      .find("[data-test='cart-order-select']")
      .findAll("option");
    await deliverySelectOptions.at(1).setSelected();

    const newAddressForm = wrapper.find("[data-test='cart-order-new-address']");
    expect(newAddressForm.exists()).toBe(true);
  });

  test("call change phone action by typing in input", async () => {
    createComponent({ store });
    const phoneInput = wrapper.find("[data-test='cart-order-phone']");
    phoneInput.element.value = "+79999999999";
    await phoneInput.trigger("input", { value: "+79999999999" });
    expect(actions.Cart[CHANGE_PHONE]).toHaveBeenCalledWith(
      expect.any(Object),
      "+79999999999"
    );
  });

  test("call change address action by typing in input", async () => {
    createComponent({ store });
    await setAddresses(store);
    const deliverySelectOptions = wrapper
      .find("[data-test='cart-order-select']")
      .findAll("option");
    await deliverySelectOptions.at(2).setSelected();
    const streetInput = wrapper.find("[data-test='cart-order-street']");
    const inputText = "улица 3";
    streetInput.element.value = inputText;
    const address = addresses[0];
    await streetInput.trigger("input", { value: inputText });
    expect(actions.Cart[CHANGE_ADDRESS]).toHaveBeenCalledWith(
      expect.any(Object),
      address
    );
  });
});
