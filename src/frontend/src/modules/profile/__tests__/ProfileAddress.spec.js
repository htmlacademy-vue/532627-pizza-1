import ProfileAddress from "@/modules/profile/ProfileAddress";
import { mount } from "@vue/test-utils";
import { REMOVE_ADDRESS, UPDATE_ADDRESS } from "@/store/actions.types";
import { generateMockStore } from "@/store/mocks";

describe("ProfileAddress", () => {
  let wrapper;
  let actions;
  let store;
  let propsData;

  const createComponent = (options) => {
    wrapper = mount(ProfileAddress, options);
  };

  beforeEach(() => {
    propsData = {
      number: 1,
      address: {
        id: 1,
        name: "name",
        street: "street",
        building: "building",
        flat: "flat",
        comment: "comment",
      },
    };
    actions = {
      Addresses: {
        [UPDATE_ADDRESS]: jest.fn(),
        [REMOVE_ADDRESS]: jest.fn(),
      },
    };
    store = generateMockStore(actions);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render profile address edition form by click", async () => {
    createComponent({ propsData });
    const editBtn = wrapper.find("[data-test='profile-address-edit'");
    await editBtn.trigger("click");
    const profileAddressForm = wrapper.findComponent({
      name: "ProfileAddressForm",
    });
    expect(profileAddressForm.exists()).toBe(true);
  });

  test("render address title", () => {
    createComponent({ propsData });
    const addressTitle = wrapper.find("[data-test='profile-address-title']");
    expect(addressTitle.text()).toBe(
      `${propsData.number}. ${propsData.address.name}`
    );
  });

  test("render formatted address", () => {
    createComponent({ propsData });
    const address = wrapper.find("[data-test='profile-formatted-address']");
    expect(address.text()).toBe(
      `${propsData.address.street} ${propsData.address.building} ${propsData.address.flat}`
    );
  });

  test("render address comment if exist", () => {
    createComponent({ propsData });
    const comment = wrapper.find("[data-test='profile-address-comment']");
    expect(comment.text()).toBe(`${propsData.address.comment}`);
  });

  test("call update address", async () => {
    createComponent({ propsData });
    const editBtn = wrapper.find("[data-test='profile-address-edit'");
    await editBtn.trigger("click");
    const profileAddressForm = wrapper.findComponent({
      name: "ProfileAddressForm",
    });

    // await profileAddressForm.trigger("submit");
    expect(profileAddressForm.exists()).toBe(true);
    /*expect(actions.Addresses[UPDATE_ADDRESS]).toHaveBeenCalledWith(
      expect.any(Object),
      {}
    );*/
  });
});
