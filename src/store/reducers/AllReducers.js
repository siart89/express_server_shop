import { combineReducers } from 'redux';
import CurrentUser from './CurrentUser';
import PopUpWindow from './PopUpWindow';
import Mode from './Mode';
import AuthUser from './AuthUser';
import Category from './Category';
import ShopCart from './ShopCart';

export default combineReducers({
  currentUser: CurrentUser,
  popUp: PopUpWindow,
  mode: Mode,
  authUser: AuthUser,
  category: Category,
  cart: ShopCart,
});
