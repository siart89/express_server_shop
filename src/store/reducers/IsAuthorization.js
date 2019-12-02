export default (state = false, action) => {
  switch (action.type) {
  case 'AUTH_OK':
    return true;
  case 'AUTH_DENIED':
    return false;
  default:
    return state;
  }
};
