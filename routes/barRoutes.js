const express = require('express')
const router = express.Router()
const {
    findAllBars,
    createBar,
    findBarByPk,
    findBarByCity,
    updateBar,
    deleteBar,
    findAllBarsRawSQL,
    searchBars } = require('../controllers/barController')
const { protect, restrictTo } = require('../middlewares/auth')

router
    .route('/')
    .get(findAllBars)
    .post(protect, createBar)

router
    .route('/rawSQL')
    .get(findAllBarsRawSQL)

router
    .route('/search')
    .get(searchBars)

router
    .route('/:id')
    .get(findBarByPk)
    .put(protect, restrictTo('admin'), updateBar)
    .delete(protect, restrictTo('admin'), deleteBar)
router
    .route('/:name')
    .get(findBarByCity)

module.exports = router