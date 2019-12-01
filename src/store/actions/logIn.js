export default (token, name, refreshToken) => ({
  type: 'LOG_IN',
  token,
  payload: {
    token,
    name,
    refreshToken,
  },
});
