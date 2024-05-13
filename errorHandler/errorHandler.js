const { UniqueConstraintError, ValidationError } = require("sequelize")

const errorHandler = (error, res) => {
    if (error instanceof UniqueConstraintError) {
        // patch de la dépendance sequelize : sur des erreurs d'unicité, on ne récupère pas le message indiqué dans le Model 
        // On récupère nous-mêmes la réponse sql de la bdd en cas d'erreur, on parse la chaîne de caractère en ne récupérant que le dernier élement (username, name, email...)
        const substrings = error.parent.sqlMessage.split(`'`)
        const field = substrings[substrings.length - 2]

        return res.status(400).json({ message: `${field} déjà pris` })
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    console.log(error)
    res.status(500).json({ message: `Une erreur est survenue` })
}

module.exports = { errorHandler }