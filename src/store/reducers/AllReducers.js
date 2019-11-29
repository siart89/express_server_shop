import { combineReducers } from 'redux';
import CurrentUser from './CurrentUser';
import PopUpWindow from './PopUpWindow';
import IsRegistred from './IsRegistred';

export default combineReducers({
  currentUser: CurrentUser,
  popUp: PopUpWindow,
  isReg: IsRegistred,
});
