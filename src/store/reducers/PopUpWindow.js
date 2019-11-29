export default (state = false, action) => {
  if (action.type === 'POP_UP') {
    return !state;
  } return state;
};
