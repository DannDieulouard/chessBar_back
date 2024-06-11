const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configs/privatekey');
const { User, Role } = require('../db/sequelizeSetup');
const { errorHandler } = require('../errorHandler/errorHandler');

const rolesHierarchy = {
    user: ['user'],
    admin: ['admin', 'user'],
    superadmin: ['superadmin', 'admin', 'user']
}

const protect = async (req, res, next) => {
    // 1. On vérifie la présence du token
    const token = req.cookies.access_token
    if (!token) {
        return res.status(401).json({ message: "Non authentifié" })
    }

    // 2. On vérifie la validité du token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);

    // On vérifie que l'id contenu dans le token correspond toujours à un utilisateur dans la bdd
        const result = await User.findByPk(decoded.userId, { include: Role })
        if (!result) {
            return res.status(404).json({ message: `Vous n'êtes pas authentifié` })
        }

        req.user = result
        next()
    } catch (error) {
        return res.status(401).json({ message: "Jeton non valide" })
    }
}

const restrictTo = (labelRole) => {
    return async (req, res, next) => {
        try {
            if (!rolesHierarchy[req.user.Role.label].includes(labelRole)) {
                return res.status(403).json({ message: "Droits insuffisants" })
            }
            next()
        } catch (error) {
            errorHandler(error, res)
        }
    }
}

const restrictToOwnUser = (model) => {
    // On va tester si l'utilisateur qui tente de faire une requête est bien l'auteur de la ressource
    return async (req, res, next) => {
        try {
            const result = await model.findByPk(req.params.id)
            if (!result) return res.status(404).json({ message: 'ressource non trouvée' })

            if (rolesHierarchy[req.user.Role.label].includes("admin")) {
                return next()
            }

            if (result.UserId !== req.user.id) {
                return res.status(403).json({ message: 'Non autorisé' })
            }

            next()
        } catch (error) {
            errorHandler(error, res)
        }
    }
}

module.exports = { protect, restrictTo, restrictToOwnUser }