const { Review } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllReviews = (req, res) => {
    res.json({ message: 'Hello Commentaire!' })
}

const findReviewByPk = (req, res) => {
    res.json({ message: `Commentaire n°${req.params.id}` })
}

const createReview = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newReview = await Review.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newReview })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateReview = async (req, res) => {
    try {
        const result = await Review.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Review modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteReview = async (req, res) => {
    try {
        const result = await Review.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Review supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview }