export default (state = {
  maxOnPage: 16,
  pageNum: 1,
}, action) => {
  switch (action.type) {
  case 'SET_LENGTH':
    return {
      ...state,
      length: action.payload.length,
      maxCount: action.payload.maxCount,
    };
  case 'SET_NUM_OF_PAGE':
    return {
      ...state,
      pageNum: action.payload,
    };
  default:
    return state;
  }
};
