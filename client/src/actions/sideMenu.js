import { SET_SIDE_MENU } from './types';

export const setSideMenu = (sideMenu) => dispatch => {
    dispatch({
        type: SET_SIDE_MENU,
        sideMenu
    });
};