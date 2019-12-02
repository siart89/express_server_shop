export default (name) => ({
  type: 'LOG_IN',
  payload: {
    name,
  },
});
