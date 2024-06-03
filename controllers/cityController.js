const { City } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllCities = async (req, res) => {
    try {
        const result = await City.findAll()
        res.json({ message: `Il y a ${result.length} villes`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findCityByPk = async (req, res) => {
    try {
        const result = await City.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `La ville n'existe pas` })
        }
        
        res.json({ message: 'Ville trouvée', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findCityByBar = async (req, res) => {
    try {
        const result = await City.findAll({
            where: { city: "Bordeaux" },
        });
        if (!result) {
            return res.status(404).json({ message: `La ville n'existe pas` })
        }
        
        res.json({ message: 'Ville trouvée', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
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