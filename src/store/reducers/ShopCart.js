const init = JSON.parse(localStorage.getItem('cart')) || [];

export default (state = init, action) => {
  switch (action.type) {
  case 'ADD_TO_CART':
    return [...state, action.payload];
  case 'REMOVE_FROM_CART':
    return state.filter((item) => item.bookId !== action.payload);
  case 'CLEAR_CART':
    return [];
  case 'INCREMENT':
    return state.map((item) => {
      if (+action.payload === +item.bookId) {
        let { count } = item;
        if (count >= 30) return item;
        count += 1;
        return { ...item, count };
      }
      return item;
    });
  case 'DECREMENT':
    return state.map((item) => {
      if (+action.payload === +item.bookId) {
        let { count } = item;
        if (count < 2) return item;
        count -= 1;
        return { ...item, count };
      }
      return item;
    });
  default:
    return state;
  }
};
