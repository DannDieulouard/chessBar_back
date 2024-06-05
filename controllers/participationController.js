const { Participation } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllParticipations = async (req, res) => {
    try {
        const result = await Participation.findAll()
        res.json({ message: `Il y a ${result.length} classements`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findParticipationByPk = async (req, res) => {
    try {
        const result = await Participation.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `La ville n'existe pas` })
        }
        
        res.json({ message: 'Ville trouvée', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createParticipation = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newParticipation = await Participation.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newParticipation })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateParticipation = async (req, res) => {
    try {
        const result = await Participation.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Participation modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteParticipation = async (req, res) => {
    try {
        const result = await Participation.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Participation supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllParticipations, findParticipationByPk, createParticipation, updateParticipation, deleteParticipation }