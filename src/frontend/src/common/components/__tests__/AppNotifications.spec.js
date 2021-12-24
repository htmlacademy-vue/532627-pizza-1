import AppNotifications from "@/common/components/AppNotifications";
import AppNotification from "@/common/components/AppNotification";

import Vuex from "vuex";
import { mount, createLocalVue } from "@vue/test-utils";
import Notifications from "@/modules/notification/store";
const localVue = createLocalVue();

localVue.use(Vuex);

describe("AppNotifications", () => {
  let wrapper;
  let store;
  let state;

  const createComponent = (options) => {
    wrapper = mount(AppNotifications, options);
  };

  beforeEach(() => {
    state = {
      notifications: [],
    };

    store = new Vuex.Store({
      modules: {
        Notification: {
          namespaced: true,
          state,
          getters: Notifications.getters,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("doesn't render without notifications", () => {
    createComponent({ store, localVue });
    expect(wrapper.html()).toBeFalsy();
  });

  test("render one notification component", () => {
    state.notifications = [{ id: 1, msg: "msg", type: "info" }];
    createComponent({ store, localVue });

    const childComponents = wrapper.findAllComponents(AppNotification);
    expect(childComponents).toHaveLength(state.notifications.length);
  });

  test("render list of notification components", () => {
    state.notifications = [
      { id: 1, msg: "msg", type: "info" },
      { id: 2, msg: "msg1", type: "info" },
      { id: 3, msg: "msg2", type: "info" },
    ];
    createComponent({ store, localVue });

    const childComponents = wrapper.findAllComponents(AppNotification);
    expect(childComponents).toHaveLength(state.notifications.length);
  });
});
