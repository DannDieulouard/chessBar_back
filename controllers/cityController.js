const { City } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllCities = (req, res) => {
    res.json({ message: 'Hello Commentaire!' })
}

const findCityByPk = (req, res) => {
    res.json({ message: `Commentaire n°${req.params.id}` })
}

const createCity = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newCity = await City.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newCity })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateCity = async (req, res) => {
    try {
        const result = await City.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'City modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteCity = async (req, res) => {
    try {
        const result = await City.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'City supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllCities, findCityByPk, createCity, updateCity, deleteCity }