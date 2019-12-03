export default (state = false, action) => {
  switch (action.type) {
  case 'AUTH_OK':
    return action.payload;
  case 'AUTH_DENIED':
    return false;
  default:
    return state;
  }
};
