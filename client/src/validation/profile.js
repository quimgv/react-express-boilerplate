import isEmpty from './isEmpty';
import validator from 'validator';

export const updateProfileValidation = (name, email) => {

    let errors = {};

    if(email && !validator.isEmail(email)) {
        errors.emailError = 'Invalid email';
    }
    if(isEmpty(name) && isEmpty(email)) {
        errors.nameError = 'Please fill at least one field to update';
        errors.emailError = 'Please fill at least one field to update';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

export const updatePasswordValidation = (currentPassword, newPassword, newPassword2) => {

    let errors = {};

    if(isEmpty(currentPassword)) {
        errors.currentPasswordError = 'Required field';

    }
    if(isEmpty(newPassword)) {
        errors.newPasswordError = 'Required field';
    }
    if(isEmpty(newPassword2)) {
        errors.newPassword2Error = 'Required field';
    }

    if( newPassword !== newPassword2) {
        errors.newPasswordError = 'Passwords do not match';
        errors.newPassword2Error = 'Passwords do not match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}

export const updateAvatarValidation = (avatar) => {

    let errors = {}
    
    if(isEmpty(avatar.name)) {
        errors.avatarError = 'Required field';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

}