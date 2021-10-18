import { resourceTypes } from "@/common/enums";
import {
  ReadOnlyApiService,
  AuthApiService,
  OrderApiService,
  AddressApiService,
} from "@/services/api.service";
import { GET_ME } from "@/store/actions.types";

/**
 * @param {Object} item
 * @param {Array} TYPES
 * @return {Object} processed item
 */
export const getValueByName = (item, TYPES) => {
  return {
    ...item,
    value: TYPES.find((type) => type?.name === item?.name)?.value,
  };
};

/**
 * @param {Array} items
 * @return {Array} processed items
 */
export const mapMiscFields = (items) => {
  return items.map((item, index) => {
    return { ...item, id: index + 1, quantity: 0 };
  });
};

/**
 * @param {Array} items
 * @return {Number} summ
 */
export const getSumm = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
};

/**
 * @param {String} value
 * @param {Array} TYPES
 * @return {Object} processed item
 */
export const getNameByValue = (value, TYPES) => {
  return TYPES.find((type) => type?.value === value)?.name;
};

export const createResources = (notifier) => {
  return {
    [resourceTypes.DOUGH]: new ReadOnlyApiService(
      resourceTypes.DOUGH,
      notifier
    ),
    [resourceTypes.SIZES]: new ReadOnlyApiService(
      resourceTypes.SIZES,
      notifier
    ),
    [resourceTypes.SAUCES]: new ReadOnlyApiService(
      resourceTypes.SAUCES,
      notifier
    ),
    [resourceTypes.INGREDIENTS]: new ReadOnlyApiService(
      resourceTypes.INGREDIENTS,
      notifier
    ),
    [resourceTypes.MISC]: new ReadOnlyApiService(resourceTypes.MISC, notifier),
    [resourceTypes.AUTH]: new AuthApiService(notifier),
    [resourceTypes.ORDERS]: new OrderApiService(resourceTypes.ORDERS, notifier),
    [resourceTypes.ADDRESSES]: new AddressApiService(
      resourceTypes.ADDRESSES,
      notifier
    ),
  };
};

export const initUser = (store) => {
  if (store.$jwt.getToken()) {
    store.$api[resourceTypes.AUTH].setAuthHeader();
    store.dispatch(`Auth/${GET_ME}`);
  }
};
