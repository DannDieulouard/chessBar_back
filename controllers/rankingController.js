const { Ranking } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllRankings = (req, res) => {
    res.json({ message: 'Hello Ranking!' })
}

const findRankingByPk = (req, res) => {
    res.json({ message: `Ranking n°${req.params.id}` })
}

const createRanking = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newRanking = await Ranking.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newRanking })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateRanking = async (req, res) => {
    try {
        const result = await Ranking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Ranking modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteRanking = async (req, res) => {
    try {
        const result = await Ranking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Ranking supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllRankings, findRankingByPk, createRanking, updateRanking, deleteRanking }