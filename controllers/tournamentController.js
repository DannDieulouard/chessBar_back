const { Tournament } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllTournaments = (req, res) => {
    res.json({ message: 'Hello Tournament!' })
}

const findTournamentByPk = (req, res) => {
    res.json({ message: `Tournament n°${req.params.id}` })
}

const createTournament = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newTournament = await Tournament.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newTournament })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateTournament = async (req, res) => {
    try {
        const result = await Tournament.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Tournament modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteTournament = async (req, res) => {
    try {
        const result = await Tournament.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Tournament supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllTournaments, findTournamentByPk, createTournament, updateTournament, deleteTournament }