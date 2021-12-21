import Profile from "@/views/Profile";
import ProfileUserData from "@/modules/profile/ProfileUserData";
import ProfileAddressList from "@/modules/profile/ProfileAddressList";
import { shallowMount } from "@vue/test-utils";

describe("Profile", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(Profile, options);
  };

  beforeEach(() => {
  });
  afterEach(() => {
    wrapper.destroy();
  });

  test("render view", () => {
    createComponent();
    expect(wrapper.exists()).toBeTruthy();
  });

  test("render profile user data component", () => {
    createComponent();
    const profileUserData = wrapper.findComponent(ProfileUserData);
    expect(profileUserData.exists()).toBeTruthy();
  });

  test("render profile address component", () => {
    createComponent();
    const profileAddressList = wrapper.findComponent(ProfileAddressList);
    expect(profileAddressList.exists()).toBeTruthy();
  });
});
