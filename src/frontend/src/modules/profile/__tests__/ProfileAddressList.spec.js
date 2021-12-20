import ProfileAddressList from "@/modules/profile/ProfileAddressList";
import { mount } from "@vue/test-utils";
import { generateMockStore, setAddresses } from "@/store/mocks";
import { ADD_ADDRESS } from "@/store/actions.types";
import ProfileAddress from "@/modules/profile/ProfileAddress";
import ProfileAddressForm from "@/modules/profile/ProfileAddressForm";
import addresses from "@/store/mocks/static/addresses.json";

describe("ProfileAddressList", () => {
  let wrapper;
  let actions;
  let store;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddressList, options);
  };

  beforeEach(() => {
    actions = {
      Addresses: {
        [ADD_ADDRESS]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
    setAddresses(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render child addresses components", () => {
    createComponent({ store });
    const profileAddressComponents = wrapper.findAllComponents(ProfileAddress);
    expect(profileAddressComponents).toHaveLength(addresses.length);
  });

  test("render new profile address form", async () => {
    createComponent({ store });
    const btn = wrapper.find("[data-test='profile-address-list-add-new']");
    await btn.trigger("click");
    const profileAddressForm = wrapper.findComponent(ProfileAddressForm);
    expect(profileAddressForm.exists()).toBe(true);
  });

  test("call ADD_ADDRESS action", async () => {
    createComponent({ store });
    createComponent({ store });
    const btn = wrapper.find("[data-test='profile-address-list-add-new']");
    await btn.trigger("click");
    const profileAddressForm = wrapper.findComponent(ProfileAddressForm);
    await profileAddressForm.trigger("submit");
    expect(actions.Addresses[ADD_ADDRESS]).toHaveBeenCalledWith(
      expect.any(Object),
      {
        building: "",
        name: "",
        street: "",
        comment: "",
        flat: "",
      }
    );
  });
});
