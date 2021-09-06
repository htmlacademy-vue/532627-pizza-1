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
