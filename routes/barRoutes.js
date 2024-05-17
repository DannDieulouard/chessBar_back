/**
 * @swagger
 * components:
 *   schemas:
 *     Bar:
 *       type: object
 *       required:
 *         - name
 *         - UserId
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the bar, auto-generated
 *         UserId:
 *           type: integer
 *           description: The id of the user who owns the bar, auto-generated
 *         name:
 *           type: string
 *           description: The name of your bar
 *         price:
 *           type: json
 *           description: The prices of your bar
 *         address:
 *           type: json
 *           description: The address of your bar
 *         superficy:
 *           type: integer
 *           description: The bar superficy
 *         capacity:
 *           type: integer
 *           description: The bar capacity
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the bar was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the bar was updated, auto-generated
 *       example:
 *         id: 12
 *         name: Oasis Bar
 *         superficy: 300
 *         capacity: 50
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express')
const router = express.Router()
const {
    findAllBars,
    createBar,
    findBarByPk,
    updateBar,
    deleteBar,
    findAllBarsRawSQL,
    createBarWithImg,
    searchBars } = require('../controllers/barController')
const { protect, restrictTo} = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const { Bar } = require('../db/sequelizeSetup')

router
    .route('/')
    /**
    * @openapi
    * /api/bars:
    *   get:
    *     summary: Get all bars
    *     tags: [Bars]
    *     responses:
    *       200:
    *         description: The list of bars.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Bar'
    *       500:
    *         description: Some server error 
    */
    .get(findAllBars)
    /**
    * @openapi
    * tags:
    *   name: Bars
    *   description: The bars managing API
    * /api/bars:
    *   post:
    *     summary: Create a new bar
    *     tags: [Bars]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Bar'
    *     responses:
    *       200:
    *         description: The created bar.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Bar'
    *       500:
    *         description: Some server error 
    */
    .post(protect, createBar)

router
    .route('/rawSQL')
    .get(findAllBarsRawSQL)

router
    .route('/withImg')
    .post(protect, multer, createBarWithImg)
router
    .route('/search')
    /**
    * @openapi
    * /api/bars/search:
    *   get:
    *     summary: Get a list of bars that match with search parameters
    *     tags: [Bars]
    *     parameters:
    *        - in: query
    *          name: name
    *          schema:               
    *          type: string
    *          description: The string that could match in any bars name
    *     responses:
    *       200:
    *         description: The bar response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Bar'
    *       404:
    *         description: The bar was not found
    */
    .get(searchBars)

router
    .route('/:id')
    /**
    * @openapi
    * /api/bars/{id}:
    *   get:
    *     summary: Get the bar by id
    *     tags: [Bars]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The bar id
    *     responses:
    *       200:
    *         description: The bar response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Bar'
    *       404:
    *         description: The bar was not found
    */
    .get(findBarByPk)
    /**
    * @openapi
    * /api/bars/{id}:
    *   put:
    *    summary: Update the bar by the id
    *    tags: [Bars]
    *    parameters:
    *      - in: path
    *        name: id
    *        schema:
    *          type: string
    *        required: true
    *        description: The bar id
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/Bar'
    *    responses:
    *      200:
    *        description: The bar was updated
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/Bar'
    *      404:
    *        description: The bar was not found
    *      500:
    *        description: Some error happened
    */
    .put(protect, restrictTo('admin'), updateBar)
    /**
    * @openapi
    * /api/bars/{id}:
    *  delete:
    *     summary: Remove the bar by id
    *     tags: [Bars]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The bar id
    *
    *     responses:
    *       200:
    *         description: The bar was deleted
    *       404:
    *         description: The bar was not found
    */
    .delete(protect, restrictTo('admin'), deleteBar)

module.exports = router