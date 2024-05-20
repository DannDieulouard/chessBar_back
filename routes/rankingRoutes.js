const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middlewares/auth')
const { createRanking, findAllRankings, findRankingByPk, updateRanking, deleteRanking } = require('../controllers/rankingController')

router
    .route('/')
    .get(findAllRankings)
    .post(protect, restrictTo('admin'), createRanking)

router
    .route('/:id')
    
    .get(findRankingByPk)
    .put(protect, restrictTo('admin'), updateRanking)
    .delete(protect, restrictTo('admin'), deleteRanking)

module.exports = router