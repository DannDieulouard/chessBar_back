const express = require('express')
const { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const { protect, restrictTo, restrictToOwnUser } = require('../middlewares/auth')
const router = express.Router()

router
    .route('/')
    .get(findAllUsers)

router
    .route('/signup')
    .post(createUser)

router
    .route('/profile/:id')
    .put(updateProfile, restrictToOwnUser)
    .delete(deleteProfile, restrictToOwnUser)

router
    .route('/login')
    .post(login)

router
    .route('/logout')
    .post(logout)

router
    .route('/:id')
    .get(findUserByPk)
    .put(updateUser)
    .delete(protect, restrictTo('superadmin'), deleteUser)

module.exports = router