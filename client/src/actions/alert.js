import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT, CLEAR_ALERTS } from './types';

export const setAlert = ( msg, alertType, timeout ) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: { 
            msg, 
            alertType, 
            id 
        }
    });

    if(timeout) {
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    }
};

export const clearAlerts = () => dispatch => {
    dispatch({
        type: CLEAR_ALERTS
    });
}