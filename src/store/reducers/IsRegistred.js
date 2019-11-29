const isTokehas = !!localStorage.getItem('token');

export default (state = isTokehas, action) => {
  switch (action.type) {
  case 'REG_IN':
    localStorage.setItem('token', JSON.stringify({ token: action.payload }));
    return true;
  case 'EXIT':
    localStorage.removeItem('token');
    return false;
  default:
    return state;
  }
};
