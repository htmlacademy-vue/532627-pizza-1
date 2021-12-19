import OrderItem from "@/modules/orders/OrderItem";
import { createLocalVue, mount } from "@vue/test-utils";
import { generateMockStore, setOrders } from "@/store/mocks";
import order from "@/store/mocks/static/order.json";
import { REPEAT_ORDER } from "@/store/actions.types";
import VueRouter from "vue-router";
import saucesList from "@/static/sauces.json";
import doughList from "@/static/dough.json";
import sizeList from "@/static/sizes.json";
import ingredientList from "@/static/ingredients.json";

const mocks = {
  $router: {
    push: jest.fn(),
  },
};

const localVue = createLocalVue();
const router = new VueRouter();

localVue.use(VueRouter);

describe("OrderItem", () => {
  let wrapper;
  let propsData;
  let store;
  let actions;

  const createComponent = (options) => {
    wrapper = mount(OrderItem, options);
  };

  beforeEach(() => {
    actions = {
      Cart: { [REPEAT_ORDER]: jest.fn() },
    };
    propsData = {
      order: order,
    };
    store = generateMockStore(actions);
    setOrders(store, [order]);
    mocks.$router.push = jest.fn();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  test("render order id", () => {
    createComponent({ store, propsData });
    const orderIdElement = wrapper.find('[data-test="order-id"]');
    expect(orderIdElement.text()).toBe(String(propsData.order.id));
  });

  test("render order total", () => {
    createComponent({ store, propsData });
    const orderTotalElement = wrapper.find('[data-test="order-total"]');
    const totalSum = store.getters["Orders/getOrderSumm"](propsData.order.id);
    expect(orderTotalElement.text()).toBe(String(totalSum));
  });

  test("repeat order", async () => {
    createComponent({ localVue, store, propsData, router });
    const repeatBtn = wrapper.find(`[data-test="repeat-order"]`);
    await repeatBtn.trigger("click");
    expect(actions.Cart[REPEAT_ORDER]).toHaveBeenCalled();
  });

  test("render  checked sauce", () => {
    createComponent({ store, propsData });
    const sauceText = wrapper.find(`[data-test="order-sauce"]`);
    const sauceName = saucesList.find(
      (sauce) => sauce.id === propsData.order.orderPizzas[0].sauceId
    )?.name?.toLowerCase;
    expect(sauceText.text().toLowerCase).toBe(sauceName);
  });

  test("render  checked dough", () => {
    createComponent({ store, propsData });
    const doughText = wrapper.find(`[data-test="order-dough"]`);
    const doughName = doughList.find(
      (dough) => dough.id === propsData.order.orderPizzas[0].doughId
    )?.name?.toLowerCase;
    expect(doughText.text().toLowerCase).toBe(doughName);
  });

  test("render  checked size", () => {
    createComponent({ store, propsData });
    const sizeText = wrapper.find(`[data-test="order-size"]`);
    const sizeName = sizeList.find(
      (size) => size.id === propsData.order.orderPizzas[0].sizeId
    )?.name?.toLowerCase;
    expect(sizeText.text().toLowerCase).toBe(sizeName);
  });

  test("render  pizza name", () => {
    createComponent({ store, propsData });
    const pizzaNameText = wrapper.find(`[data-test="order-pizza-name"]`);
    const pizzaName = propsData.order.orderPizzas[0]?.name;
    expect(pizzaNameText.text()).toBe(pizzaName);
  });

  test("render ingredients", async () => {
    createComponent({ store, propsData });
    await localVue.nextTick();
    const ingredientsText = wrapper.find(`[data-test="order-ingredients"]`);
    const ingredients = propsData.order.orderPizzas[0].ingredients
      .map(
        (ingredient) =>
          ingredientList.find((ingr) => ingr.id === ingredient.ingredientId)
            ?.name
      )
      ?.join(", ");
    expect(ingredientsText.text()).toBe(ingredients.toLowerCase());
  });

  test("render order address", async () => {
    createComponent({ store, propsData });
    const orderWithAdress = {
      ...order,
      addressId: 1,
      orderAddress: {
        id: 1,
        name: null,
        street: "Адрес",
        building: "3",
        flat: "3",
      },
    };
    await wrapper.setProps({ order: orderWithAdress });
    const addressElement = wrapper.find(`[data-test="order-address"]`);
    expect(addressElement.text()).toBe(
      `Адрес доставки: ул. ${orderWithAdress.orderAddress.street}, д. ${orderWithAdress.orderAddress.building}, кв. ${orderWithAdress.orderAddress.flat}`
    );
  });

  test("don't render order address in order with pickup", () => {
    createComponent({ store, propsData });
    const addressElement = wrapper.find(`[data-test="order-address"]`);
    expect(addressElement.text()).toBe("Самовывоз");
  });
});
