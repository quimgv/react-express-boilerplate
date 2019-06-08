import isEmpty from './isEmpty';

export const signupValidation = (name, email, password, password2) => {

    let errors = [];

    if(isEmpty(name) || isEmpty(email) || isEmpty(password) || isEmpty(password2)) {
        // setAlert('Please fill the required fields', 'danger', 20000);
        errors.push({ msg: 'Please fill the required fields' });
    }

    if( password !== password2) {
        // setAlert('Passwords do not match', 'danger', 20000);
        errors.push({ msg: 'Passwords do not match' });
    }

    return {
        errors
    }

}

export const loginValidation = ( email, password ) => {

    let errors = [];

    if(isEmpty(email) || isEmpty(password)) {
        // setAlert('Please fill the required fields', 'danger', 20000);
        errors.push({ msg: 'Please fill the required fields' });
    }

    return {
        errors
    }

}