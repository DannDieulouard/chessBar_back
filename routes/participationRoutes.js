const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middlewares/auth')
const { createParticipation, findAllParticipations, findParticipationByPk, updateParticipation, deleteParticipation } = require('../controllers/participationController')

router
    .route('/')
    .get(findAllParticipations)
    .post(protect, restrictTo('admin'), createParticipation)

router
    .route('/:id')
    
    .get(findParticipationByPk)
    .put(protect, restrictTo('admin'), updateParticipation)
    .delete(protect, restrictTo('admin'), deleteParticipation)

module.exports = router