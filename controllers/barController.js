const { Op, QueryTypes } = require('sequelize')
const { Bar, sequelize } = require('../db/sequelizeSetup')
const { errorHandler } = require('../errorHandler/errorHandler')

const findAllBars = async (req, res) => {
    // A l'aide de req.query, on ajoute une fonction de recherche de Bar sur critère du nom
    try {
        const results = await Bar.findAll()
        res.json({ message: `Il y a ${results.length} bars`, data: results })
    } catch (error) {
        errorHandler(error, res)
    }
}

// On utilise la méthode sequelize.query() pour écrire une requête SQL en dur, SELECT name, rating FROM Bar
const findAllBarsRawSQL = async (req, res) => {
    try {
        const result = await sequelize.query("SELECT name, rating FROM bars LEFT JOIN reviews ON bars.id = reviews.BarId", {
            type: QueryTypes.SELECT,
        })
        res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const searchBars = async (req, res) => {
    // A l'aide de req.query, on ajoute une fonction de recherche de Bar sur critère du nom
    try {
        const results = await Bar.findAll(
            {
                where:
                    { name: { [Op.like]: `%${req.query.name}%` } }
            }
        )
        res.json({ message: `Il y a ${results.length} bars`, data: results })

    } catch (error) {
        errorHandler(error, res)
    }
}

const findBarByPk = async (req, res) => {
    try {
        const result = await Bar.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le bar n'existe pas` })
        }
        
        res.json({ message: 'Bar trouvé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createBar = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        req.body.address = JSON.parse(req.body.address)
        const newBar = await Bar.create(req.body)
        res.status(201).json({ message: `Un bar a bien été ajouté`, data: newBar })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createBarWithImg = async (req, res) => {
    console.log(req.protocol, req.get('host'), req.file.filename)
    try {
        req.body.UserId = req.user.id
        req.body.address = JSON.parse(req.body.address)
        req.body.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const newBar = await Bar.create(req.body)
        res.status(201).json({ message: `Un bar a bien été ajouté`, data: newBar })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateBar = async (req, res) => {
    try {
        const result = await Bar.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le bar n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Bar modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteBar = async (req, res) => {
    try {
        const result = await Bar.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le bar n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Bar supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    findAllBars,
    createBar,
    createBarWithImg,
    findBarByPk,
    updateBar,
    deleteBar,
    searchBars,
    findAllBarsRawSQL
}