import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";

describe("AppDrag", () => {
  const slots = { default: "content" };
  const propsData = { transferData: {}, draggable: true };

  // wrapper — тест-обёртка над компонентом.
  let wrapper;

  // Для каждого теста мы будем создавать новую обёртку.
  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };

  // Уничтожаем обёртку после каждого теста.
  afterEach(() => {
    wrapper.destroy();
  });

  // Проверяем, что кнопка отображает контент дефолтного слота.
  it("renders out the slot content", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });

  //TODO доделать тест
});
