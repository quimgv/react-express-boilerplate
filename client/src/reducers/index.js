import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import sideMenu from './sideMenu';

export default combineReducers({
    alert,
    auth,
    sideMenu
});