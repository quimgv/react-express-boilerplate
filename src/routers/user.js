const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadImage');

// Load controllers
const UsersController = require('../controllers/user');

// @route   POST /users
// @desc    Create new user
// @access  Public
router.post('/', UsersController.create_user);

// @route   POST /users/login
// @desc    Login user
// @access  Public
router.post('/login', UsersController.login_user);

// @route   POST /users/logout
// @desc    Logout user
// @access  Private
router.post('/logout', auth, UsersController.user_logout);

// @route   POST /users/logoutAll
// @desc    Logout all my active accounts in all my
// @access  Private
router.post('/logoutAll', auth, UsersController.user_logout_all);

// @route   GET /users/me
// @desc    Get my profile
// @access  Private
router.get('/me', auth, UsersController.user_profile);

// @route   PATCH /users/me
// @desc    Edit my profile
// @access  Private
router.patch('/me', auth, upload.single('avatar'), UsersController.update_user_profile);

// @route   DELETE /users/me
// @desc    Delete my profile
// @access  Private
router.delete('/me', auth, UsersController.delete_user_account);

// @route   POST /users/me/avatar
// @desc    Upload avatar
// @access  Private
router.post('/me/avatar', auth, upload.single('avatar'), UsersController.upload_avatar);

// @route   DELETE /users/me/avatar
// @desc    Delete avatar
// @access  Private
router.delete('/me/avatar', auth, UsersController.delete_avatar);

// @route   GET /users/:id/avatar
// @desc    Get user avatar
// @access  Private
router.get('/:id/avatar', UsersController.get_avatar);

module.exports = router