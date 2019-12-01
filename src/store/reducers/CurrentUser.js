const initState = JSON.parse(localStorage.getItem('userName')) || null;

export default (state = initState, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    const { name, token, refreshToken } = action.payload;
    const upName = `${name[0].toUpperCase()}${name.slice(1)}`;

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    localStorage.setItem('userName', JSON.stringify(upName));
    return upName;
  }
  case 'LOG_OUT':
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    return null;
  default:
    return state;
  }
};
