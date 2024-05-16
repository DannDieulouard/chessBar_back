const express = require('express')
const router = express.Router()
const { protect, restrictToOwnUser } = require('../middlewares/auth')
const { createCity, findAllCities, findCityByPk, updateCity, deleteCity } = require('../controllers/cityController')
const { City } = require('../db/sequelizeSetup')

router
    .route('/')
    .get(findAllCities)
    .post(protect, createCity)

router
    .route('/:id')
    
    .get(findCityByPk)
    .put(protect, restrictToOwnUser(City), updateCity)
    .delete(protect, restrictToOwnUser(City), deleteCity)

module.exports = router