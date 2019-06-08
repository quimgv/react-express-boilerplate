import React, { useState } from 'react';
import { Row, Col, Button, Form, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { setAlert, clearAlerts } from '../actions/alert';
import { loadUser, logoutAll } from '../actions/auth';

// Validation
import {
  updateProfileValidation,
  updatePasswordValidation,
  updateAvatarValidation
} from '../validation/profile';

import axios from 'axios';

import { errorAlert } from '../config/commonStrings';

const ProfileSettings = ({ setAlert, loadUser, clearAlerts, logoutAll }) => {

  const initialState = {
    avatar: '',
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    newPassword2: '',
    avatarError: '',
    nameError: '',
    emailError: '',
    currentPasswordError: '',
    newPasswordError: '',
    newPassword2Error: ''
  };

  const [formData, setFormData] = useState(initialState);

  const {
    avatar,
    name,
    email,
    currentPassword,
    newPassword,
    newPassword2,
    avatarError,
    nameError,
    emailError,
    currentPasswordError,
    newPasswordError,
    newPassword2Error
  } = formData;

  const handleOnChange = e => {
    let target = e.target.value;
    if (e.target.type === 'file') {
      target = e.target.files[0];
    }

    setFormData({ ...formData, [e.target.name]: target });
  };

  const handleOnSubmitPassword = async e => {
    e.preventDefault(e);

    // Form validation
    const { errors, isValid } = updatePasswordValidation(
      currentPassword,
      newPassword,
      newPassword2
    );

    const resetErrors = {
      currentPasswordError: '',
      newPasswordError: '',
      newPassword2Error: ''
    };

    if (!isValid) {
      return setFormData({ ...formData, ...resetErrors, ...errors });
    }

    clearAlerts();

    // Update profile
    try {
      await axios.patch('/users/me', {
        currentPassword,
        password: newPassword
      });

      loadUser();
      setAlert('Password updated', 'success');
    } catch (err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }

    setFormData(initialState);
  };

  const handleOnSubmitPersonal = async e => {
    e.preventDefault(e);

    // Form Validation
    const { errors, isValid } = updateProfileValidation(name, email);

    const resetErrors = {
      nameError: '',
      emailError: ''
    };

    if (!isValid) {
      return setFormData({ ...formData, ...resetErrors, ...errors });
    }

    clearAlerts();

    // Update profile
    try {
      await axios.patch('/users/me', {
        name: name ? name : undefined,
        email: email ? email : undefined
      });

      loadUser();
      setAlert('User updated', 'success');
    } catch (err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }
    setFormData(initialState);
  };

  const handleOnSubmitAvatar = async e => {
    e.preventDefault();

    const { errors, isValid } = updateAvatarValidation(avatar);

    const resetErrors = {
      avatarError: ''
    };

    if (!isValid) {
      return setFormData({ ...formData, ...resetErrors, ...errors });
    }

    const data = new FormData();
    data.append('avatar', avatar);

    clearAlerts();

    try {
      await axios.post('/users/me/avatar', data);

      // Set Success alert
      loadUser();
      setAlert('Avatar uploaded', 'success');
      setFormData(initialState);
    } catch (err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await axios.delete('/users/me/avatar');

      loadUser();
      setAlert('Avatar deleted', 'success');
      setFormData(initialState);
    } catch(err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('/users/me');
      loadUser();
    } catch(err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }
  };

  const handleLogoutAll = async () => {
    try {
      logoutAll();
    } catch(err) {
      console.log(err);
      setAlert(errorAlert.text, 'danger');
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <div className='card mb-4'>
          <div className='card-body'>
            <div className='card-header'>
              <h5 className='card-title'>Avatar</h5>
            </div>
            <Form onSubmit={e => handleOnSubmitAvatar(e)}>
              <Form.Group>
                <Form.Label>Upload New Picture</Form.Label>
                <Form.Control
                  type='file'
                  placeholder=''
                  className='form-control'
                  name='avatar'
                  onChange={e => handleOnChange(e)}
                  isValid={!!avatarError && false}
                  isInvalid={!!avatarError && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{avatarError && avatarError}</div>
                </FormControl.Feedback>
              </Form.Group>
              <div className='text-center'>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
                <Button style={{marginLeft: '10px'}} variant='outline-primary' onClick={handleDeleteAvatar}>
                  Delete
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className='card mb-4'>
          <div className='card-body'>
            <div className='card-header'>
              <h5 className='card-title'>Personal Information</h5>
            </div>
            <Form onSubmit={e => handleOnSubmitPersonal(e)}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=''
                  onChange={e => handleOnChange(e)}
                  name='name'
                  value={name}
                  isValid={!!nameError && true}
                  isInvalid={nameError && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{nameError && nameError}</div>
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder=''
                  onChange={e => handleOnChange(e)}
                  name='email'
                  value={email}
                  isValid={!!emailError && true}
                  isInvalid={emailError && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{emailError && emailError}</div>
                </FormControl.Feedback>
              </Form.Group>
              <div className='text-center'>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className='card mb-4'>
          <div className='card-body'>
            <div className='card-header'>
              <h5 className='card-title'>Change your password</h5>
            </div>
            <Form onSubmit={e => handleOnSubmitPassword(e)}>
              <Form.Group>
                <Form.Label>Current password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder=''
                  onChange={e => handleOnChange(e)}
                  name='currentPassword'
                  value={currentPassword}
                  isValid={!!currentPasswordError && true}
                  isInvalid={currentPasswordError && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{currentPasswordError && currentPasswordError}</div>
                </FormControl.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder=''
                  onChange={e => handleOnChange(e)}
                  name='newPassword'
                  value={newPassword}
                  isValid={!!newPasswordError && true}
                  isInvalid={newPasswordError && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{newPasswordError && newPasswordError}</div>
                </FormControl.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder=''
                  onChange={e => handleOnChange(e)}
                  name='newPassword2'
                  value={newPassword2}
                  isValid={!!newPassword2Error && true}
                  isInvalid={newPassword2Error && true}
                />
                <FormControl.Feedback type='invalid'>
                  <div>{newPassword2Error && newPassword2Error}</div>
                </FormControl.Feedback>
              </Form.Group>

              <div className='text-center'>
                <Button variant='primary' type='submit'>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className='text-right'>
                <Button variant='outline-danger' onClick={handleLogoutAll} >
                  Log out all accounts
                </Button>
                <Button style={{marginLeft: '10px'}} variant='danger' onClick={handleDeleteAccount}>
                  Delete account
                </Button>
              </div>
      </Col>
    </Row>
    

  );
};

ProfileSettings.propTypes = {
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.object,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { setAlert, clearAlerts, loadUser, logoutAll }
)(ProfileSettings);
