import Orders from "@/views/Orders";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import { generateMockStore, setOrders } from "@/store/mocks";
import order from "@/store/mocks/static/order.json";
import OrderItem from "@/modules/orders/OrderItem";

const localVue = createLocalVue();

describe("Orders", () => {
  let wrapper;
  let store;

  const createComponent = (options) => {
    wrapper = shallowMount(Orders, options);
  };

  beforeEach(async () => {
    store = generateMockStore({});
    setOrders(store, [order]);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render view", () => {
    createComponent({ store });
    expect(wrapper.exists()).toBeTruthy();
  });

  test("render order items", async () => {
    createComponent({ localVue, store });
    await localVue.nextTick();
    const orderItems = wrapper.findAllComponents(OrderItem);
    expect(orderItems).toHaveLength([order].length);
  });
});
