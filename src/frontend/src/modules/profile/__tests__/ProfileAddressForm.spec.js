import ProfileAddressForm from "@/modules/profile/ProfileAddressForm";
import { shallowMount } from "@vue/test-utils";

describe("ProfileAddressForm", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileAddressForm, options);
  };

  beforeEach(() => {
    propsData = {
      number: 1,
      address: {
        id: 1,
        name: "Address #1",
        street: "street",
        building: "building",
        flat: "flat",
        comment: "comment",
      },
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("emit remove event", async () => {
    createComponent({ propsData });
    const btnRemove = wrapper.findComponent({
      ref: "profile-address-form-btn-remove",
    });
    await btnRemove.vm.$emit("click");
    expect(wrapper.emitted("remove")).toBeTruthy();
  });

  test("render address number", () => {
    createComponent({ propsData });
    const number = wrapper.find("[data-test='profile-address-number']");
    expect(number.text()).toBe(String(propsData.number));
  });

  test("render address name", () => {
    createComponent({ propsData });
    const number = wrapper.findComponent({ ref: "profile-address-name" }).vm
      .$options.propsData.value;
    expect(number).toBe(String(propsData.address.name));
  });

  test("render address street", () => {
    createComponent({ propsData });
    const street = wrapper.findComponent({ ref: "profile-address-street" }).vm
      .$options.propsData.value;
    expect(street).toBe(String(propsData.address.street));
  });
  test("render address building", () => {
    createComponent({ propsData });
    const building = wrapper.findComponent({ ref: "profile-address-building" })
      .vm.$options.propsData.value;
    expect(building).toBe(String(propsData.address.building));
  });

  test("render address flat", () => {
    createComponent({ propsData });
    const flat = wrapper.findComponent({ ref: "profile-address-flat" }).vm
      .$options.propsData.value;
    expect(flat).toBe(String(propsData.address.flat));
  });
  test("render address comment", () => {
    createComponent({ propsData });
    const comment = wrapper.findComponent({ ref: "profile-address-comment"}).vm
      .$options.propsData.value;
    expect(comment).toBe(String(propsData.address.comment));
  });
  test("emit submit event", async () => {
    createComponent({ propsData });
    const form = wrapper.find("[data-test='profile-address-form']");
    await form.trigger("submit");
    expect(wrapper.emitted("submit")).toBeTruthy();
  });
});
