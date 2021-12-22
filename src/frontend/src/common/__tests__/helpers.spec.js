import {
  getValueByName,
  getNameByValue,
  getSumm,
  getRandomInt,
} from "@/common/helpers";
import { SAUCE_TYPES } from "@/common/constants";

describe("Test getNameByValue", () => {
  test("Must return undefined name property", () => {
    const exampleValue = undefined;
    const expectedName = undefined;
    const name = getNameByValue(exampleValue, SAUCE_TYPES);

    expect(name).toStrictEqual(expectedName);
  });

  test("Must return right name", () => {
    const exampleValue = "tomato";
    const expectedName = "Томатный";
    const name = getNameByValue(exampleValue, SAUCE_TYPES);

    expect(name).toStrictEqual(expectedName);
  });
});

describe("Test getValueByName", () => {
  test("Must return undefined value property", () => {
    const item = {
      name: "Неизвестное имя соуса",
      image: "/public/img/sauce.svg",
      price: 10,
    };
    const expectedObject = { ...item, value: undefined };
    const objectWithValue = getValueByName(item, SAUCE_TYPES);

    expect(objectWithValue).toMatchObject(expectedObject);
  });

  test("Must return expected value in value property", () => {
    const item = {
      name: "Томатный",
      image: "/public/img/sauce.svg",
      price: 10,
    };

    const objectWithValue = getValueByName(item, SAUCE_TYPES);
    const expectedObject = { ...item, value: "tomato" };
    expect(objectWithValue).toMatchObject(expectedObject);
  });
});

describe("Test getRandomInt", () => {
  test("Must return int", () => {
    const isInteger = Number.isInteger(getRandomInt());
    expect(isInteger).toBeTruthy();
  });
});

describe("Test getSumm", () => {
  test("One item. Must return 100", () => {
    const pizzas = [
      {
        price: 100,
        quantity: 1,
      },
    ];

    const summ = getSumm(pizzas);
    expect(summ).toBe(100);
  });

  test("Must return 200", () => {
    const pizzas = [
      {
        price: 100,
        quantity: 2,
      },
    ];

    const summ = getSumm(pizzas);
    expect(summ).toBe(200);
  });

  test("Must return 300", () => {
    const pizzas = [
      {
        price: 100,
        quantity: 2,
      },
      {
        price: 100,
        quantity: 1,
      },
    ];

    const summ = getSumm(pizzas);
    expect(summ).toBe(300);
  });
});
