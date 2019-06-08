import { SET_SIDE_MENU } from "../actions/types";


const initialState = false;

export default function(state = initialState, action) {

    const { type, sideMenu } = action;

    switch(type) {
        case SET_SIDE_MENU:
            return sideMenu;
        default:
        return state;
    }

};