export default (length, maxCount) => ({
  type: 'SET_LENGTH',
  payload: {
    length,
    maxCount,
  },
});
