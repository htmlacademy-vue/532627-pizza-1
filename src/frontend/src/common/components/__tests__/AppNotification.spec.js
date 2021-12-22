import AppNotification from "@/common/components/AppNotification";
import { shallowMount } from "@vue/test-utils";

describe("AppNotification", () => {
  let wrapper;
  let propsData;

  const createComponent = (options) => {
    wrapper = shallowMount(AppNotification, options);
  };

  beforeEach(() => {
    propsData = {
      message: "Notification message",
      type: "info",
    };
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render message content", async () => {
    createComponent({ propsData });
    expect(wrapper.html()).toContain("Notification message");
  });

  test("contain class warning message content", async () => {
    propsData.type = "warning";
    createComponent({ propsData });
    const message = wrapper.find("[data-test='message']");
    expect(message.classes()).toContain("notification__message_warning");
  });

  test("contain error class modificator message content", async () => {
    propsData.type = "error";
    createComponent({ propsData });
    const message = wrapper.find("[data-test='message']");
    expect(message.classes()).toContain("notification__message_error");
  });

  test("contain success class modificator message content", async () => {
    propsData.type = "success";
    createComponent({ propsData });
    const message = wrapper.find("[data-test='message']");
    expect(message.classes()).toContain("notification__message_success");
  });
});
