import ProfileUserData from "@/modules/profile/ProfileUserData";
import { shallowMount } from "@vue/test-utils";
import { generateMockStore } from "@/store/mocks";
import { SET_USER } from "@/store/mutation.types";
import user from "@/store/mocks/static/user.json";

describe("ProfileUserData", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(ProfileUserData, options);
  };

  beforeEach(() => {
    store = generateMockStore({});
    store.commit(`Auth/${SET_USER}`, user);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render user avatar", () => {
    createComponent({ store });
    const avatar = wrapper.find("[data-test='profile-user-avatar']");
    expect(avatar.exists()).toBe(true);
  });

  test("render user phone", () => {
    createComponent({ store });
    const avatar = wrapper.find("[data-test='profile-user-phone']");
    expect(avatar.exists()).toBe(true);
  });

  test("render user name", () => {
    createComponent({ store });
    const avatar = wrapper.find("[data-test='profile-user-name']");
    expect(avatar.exists()).toBe(true);
  });
});
