/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username of user
 *         password:
 *           type: string
 *           description: The password of a user, hashed in db
 *         address:
 *           type: json
 *           description: The address of a user
 *         email:
 *           type: string
 *           description: The email of a user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated, auto-generated
 *       example:
 *         id: 12
 *         username: Paul Doazan
 *         password: password
 *         email: paul@example.com
 *         address: { "number": "6", "street": "rue Victor Hugo", "postCode": 33000, "city": "Bordeaux" }
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express')
const { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile } = require('../controllers/userController')
const { login, logout } = require('../controllers/authController')
const { protect, restrictTo } = require('../middlewares/auth')
const router = express.Router()

router
    .route('/')
    /**
    * @openapi
    * /api/users:
    *   get:
    *     summary: Get all users
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: The list of users.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       500:
    *         description: Some server error 
    */
    .get(protect, restrictTo('admin'), findAllUsers)

router
    .route('/signup')
    /**
    * @openapi
    * /api/users/signup:
    *   post:
    *     summary: Create a new user
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       200:
    *         description: The created user.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       500:
    *         description: Some server error 
    */
    .post(createUser)

router
    .route('/profile/')
    /**
    * @openapi
    * /api/users/:
    *   put:
    *    summary: The user can update his profile, by the id given in a jsonwebtoken
    *    tags: [Users]
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/user'
    *    responses:
    *      200:
    *        description: The user was updated
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/User'
    *      404:
    *        description: The user was not found
    *      500:
    *        description: Some error happened
    */
    .put(protect, updateProfile)
    /**
    * @openapi
    * /api/users/:
    *   delete:
    *    summary: The user can delete his profile, by the id given in a jsonwebtoken
    *    tags: [Users]
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/user'
    *    responses:
    *      200:
    *        description: The user was deleted
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/User'
    *      404:
    *        description: The user was not found
    *      500:
    *        description: Some error happened
    */
    .delete(protect, deleteProfile)

router
    .route('/login')
    /**
    * @openapi
    * /api/users/login:
    *   post:
    *     summary: Login as user
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       200:
    *         description: Login successful.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       400:
    *         description: Invalid credentials.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       500:
    *         description: Some server error 
    */
    .post(login)

router
    .route('/logout')
    /**
    * @openapi
    * /api/users/logout:
    *   post:
    *     summary: Logout
    *     tags: [Users]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       200:
    *         description: Logout successful.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    */
    .post(logout)

router
    .route('/:id')
    /**
    * @openapi
    * /api/users/{id}:
    *   get:
    *     summary: Get the user by id
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The user id
    *     responses:
    *       200:
    *         description: The user response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    */
    .get(protect, restrictTo('admin'), findUserByPk)
    /**
    * @openapi
    * /api/users/{id}:
    *   put:
    *     summary: Update the user by id, restricted to admin
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The user id
    *     responses:
    *       200:
    *         description: User updated
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    */
    .put(protect, restrictTo('admin'), updateUser)
    /**
    * @openapi
    * /api/users/{id}:
    *   delete:
    *     summary: Delete the user by id, restricted to admin
    *     tags: [Users]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The user id
    *     responses:
    *       200:
    *         description: User deleted
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       404:
    *         description: The user was not found
    */
    .delete(protect, restrictTo('superadmin'), deleteUser)

module.exports = router