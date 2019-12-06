import { combineReducers } from 'redux';
import CurrentUser from './CurrentUser';
import PopUpWindow from './PopUpWindow';
import Mode from './Mode';
import AuthUser from './AuthUser';

export default combineReducers({
  currentUser: CurrentUser,
  popUp: PopUpWindow,
  mode: Mode,
  authUser: AuthUser,
});
