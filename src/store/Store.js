import { createStore } from 'redux';
import AllReducers from './reducers/AllReducers';

const Store = createStore(
  AllReducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
