const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middlewares/auth')
const { createCity, findAllCities, findCityByPk, updateCity, deleteCity } = require('../controllers/cityController')
const { City } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllCities)
    .post(protect, restrictTo('admin'),createCity)

router
    .route('/:id')
    
    .get(findCityByPk)
    .put(protect, restrictTo('admin'), updateCity)
    .delete(protect, restrictTo('admin'), deleteCity)

module.exports = router