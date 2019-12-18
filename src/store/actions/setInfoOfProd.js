export default (length, maxCount, headers) => ({
  type: 'SET_INFO',
  payload: {
    length,
    maxCount,
    headers,
  },
});
