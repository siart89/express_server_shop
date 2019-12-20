export default (min, max, sale) => ({
  type: 'SET_PRICE_FILTER',
  payload: {
    min,
    max,
    sale,
  },
});
