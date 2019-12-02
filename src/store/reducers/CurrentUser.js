const initState = {
  name: JSON.parse(localStorage.getItem('userName')) || null,
  isLogIn: JSON.parse(localStorage.getItem('token')) && true,
};

export default (state = initState, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    const { name } = action.payload;
    const upName = `${name[0].toUpperCase()}${name.slice(1)}`;
    localStorage.setItem('userName', JSON.stringify(upName));
    return { name: upName, isLogIn: true };
  }
  case 'LOG_OUT':
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    return { name: null, isLogIn: false };
  default:
    return state;
  }
};
