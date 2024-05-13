/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - UserId
 *         - CoworkingId
 *         - content
 *         - rating
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the review, auto-generated
 *         UserId:
 *           type: integer
 *           description: The id of the user who made the review, auto-generated
 *         CoworkingId:
 *           type: integer
 *           description: The id of the coworking reviewed
 *         content:
 *           type: string
 *           description: The content of review
 *         rating:
 *           type: integer
 *           description: The rating of a review, between 0 and 5
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the user was added, auto-generated
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the user was updated, auto-generated
 *       example:
 *         id: 879
 *         content: Nice place
 *         rating: 4
 *         UserId: 45
 *         CoworkingId: 12
 *         createdAt: 2020-03-10T04:05:06.157Z
 *         updatedAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express')
const router = express.Router()
const { protect, restrictToOwnUser } = require('../middlewares/auth')
const { createReview, findAllReviews, findReviewByPk, updateReview, deleteReview } = require('../controllers/reviewController')
const { Review } = require('../db/sequelizeSetup')

router
    .route('/')
    /**
    * @openapi
    * /api/reviews:
    *   get:
    *     summary: Get all reviews
    *     tags: [Reviews]
    *     responses:
    *       200:
    *         description: The list of reviews.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Review'
    *       500:
    *         description: Some server error 
    */
    .get(findAllReviews)
    /**
    * @openapi
    * /api/reviews/:
    *   post:
    *     summary: Create a new review
    *     tags: [Reviews]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/Review'
    *     responses:
    *       200:
    *         description: The created review.
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Review'
    *       500:
    *         description: Some server error 
    */
    .post(protect, createReview)

router
    .route('/:id')
    /**
    * @openapi
    * /api/reviews/{id}:
    *   get:
    *     summary: Get the review by id
    *     tags: [Reviews]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The review id
    *     responses:
    *       200:
    *         description: The review response by id
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Review'
    *       404:
    *         description: The review was not found
    */
    .get(findReviewByPk)
    /**
    * @openapi
    * /api/reviews/{id}:
    *   put:
    *     summary: Update the review by id
    *     tags: [Reviews]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The review id
    *     responses:
    *       200:
    *         description: review updated
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Review'
    *       404:
    *         description: The review was not found
    */
    .put(protect, restrictToOwnUser(Review), updateReview)
    /**
    * @openapi
    * /api/reviews/{id}:
    *   delete:
    *     summary: Delete the review by id, restricted to admin
    *     tags: [Reviews]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The review id
    *     responses:
    *       200:
    *         description: review deleted
    *         contents:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Review'
    *       404:
    *         description: The review was not found
    */
    .delete(protect, restrictToOwnUser(Review), deleteReview)

module.exports = router