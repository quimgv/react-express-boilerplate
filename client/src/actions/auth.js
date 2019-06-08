import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT 
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Load user
export const loadUser = () => async dispatch => {


    try {
        const res = await axios.get('/users/me');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register user
export const register = ({name, email, password}) => async dispatch => {

    try {

        const res = await axios.post('/users', {name, email, password});

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        axios.defaults.headers.common['Authorization'] = localStorage.Authorization;

    } catch(err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 20000)))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login user
export const login = (email, password) => async dispatch => {

    try {

        const res = await axios.post('/users/login', {email, password});

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        axios.defaults.headers.common['Authorization'] = localStorage.Authorization;

    } catch(err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 20000)))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Logout
export const logout = () => async dispatch => {

    try {

        const token = localStorage.Authorization.split(' ')[1];

        await axios.post('/users/logout', {token});

        dispatch({
            type: LOGOUT
        });

    } catch(err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 20000)))
        }
    }
}

// Logout
export const logoutAll = () => async dispatch => {

    try {

        await axios.post('/users/logoutAll');

        dispatch({
            type: LOGOUT
        });

    } catch(err) {

        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 20000)))
        }
    }
}
