const { User, Role } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt');
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllUsers = async (req, res) => {
    try {
        const result = await User.findAll()
        res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
    res.json({})
}

const findUserByPk = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id, { include: Role })
        if (!result) {
            return res.json({ message: 'Utilisateur non trouvé' })
        }
        res.json({ data: result })
    } catch (error) {
        errorHandler(error, res)
    }
    res.json({})
}

const createUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 5)
        req.body.password = hashPassword

        if (req.body.RoleId) {
            return res.status(403).json({ message: 'Droit non modifiable' })
        }

        const result = await User.create(req.body)

        res.json({ message: `Utilisateur créé`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id, { include: Role });
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }

        // On évite l'attribution d'un droit supérieur à ses propres droits et la modification d'un utilisateur supérieur
        if (req.body.RoleId) {
            if (result.RoleId < req.user.RoleId || req.body.RoleId < req.user.RoleId) return res.status(403).json({ message: "Droits insuffisants pour mise à jour" })
        }

        await result.update(req.body)

        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'utilisateur n'existe pas` })
        }

        await result.destroy()
        res.status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateProfile = async (req, res) => {
    // 1. récupérer la ligne de l'utilisateur au sein de la table User, sans le req.params.id
    try {
        const result = await User.findByPk(req.user.id, { include: Role });
        if (req.body.password) {
            const hash = await bcrypt.hash(req.body.password, 8)
            req.body.password = hash
        }

        if (req.body.RoleId) {
            return res.status(403).json({ message: 'Droit non modifiable' })
        }

        // 2. on modifie les propriétés fournies dans le req.body
        await result.update(req.body)

        res.status(201).json({ message: 'Utilisateur modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteProfile = async (req, res) => {
    // 1. récupérer la ligne de l'utilisateur au sein de la table User, sans le req.params.id
    try {
        const result = await User.findByPk(req.user.id);
        await result.destroy()
        res.clearCookie('access_token').status(200).json({ message: 'Utilisateur supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

// On évite la possibilité de mettre son propre RoleId dans createUser
// On évite de mettre un droit supérieur à son propre droit dans updateUser
// On évite de mettre à jour son RoleId dans updateProfile



module.exports = { findAllUsers, findUserByPk, createUser, updateProfile, updateUser, deleteUser, deleteProfile }