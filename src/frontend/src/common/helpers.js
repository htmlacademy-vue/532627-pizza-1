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
