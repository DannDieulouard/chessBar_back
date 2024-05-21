const { Ranking } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllRankings = async (req, res) => {
    try {
        const result = await Ranking.findAll()
        res.json({ message: `Il y a ${result.length} classements`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findRankingByPk = async (req, res) => {
    try {
        const result = await Ranking.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `La ville n'existe pas` })
        }
        
        res.json({ message: 'Ville trouvée', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
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