const express = require('express')
const router = express.Router()
const { protect, restrictTo } = require('../middlewares/auth')
const { createTournament, findAllTournaments, findTournamentByPk, updateTournament, deleteTournament } = require('../controllers/tournamentController')

router
    .route('/')
    .get(findAllTournaments)
    .post(protect, restrictTo('admin'), createTournament)

router
    .route('/:id')
    
    .get(findTournamentByPk)
    .put(protect, restrictTo('admin'), updateTournament)
    .delete(protect, restrictTo('admin'), deleteTournament)

module.exports = router