export default (state = true, action) => {
  switch (action.type) {
  case 'MODE_LOG':
    return true;
  case 'MODE_REG':
    return false;
  default:
    return state;
  }
};
