export default (state = {
  maxOnPage: 16,
  pageNum: 1,
  sort: 'created_at',
  incDec: 'ASC',
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
  case 'SORT_INC_DEC':
    return { ...state, incDec: action.payload };
  case 'SET_SORT_TYPE':
    return { ...state, sort: action.payload };
  default:
    return state;
  }
};
