const { User } = require("../db/sequelizeSetup")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configs/privatekey");
const { errorHandler } = require("../errorHandler/errorHandler");

const login = async (req, res) => {
    // 1. vérifions que l'utilisateur qui tente de se connecter existe bien dans la bdd
    // S'il n'existe pas, on renvoie une réponse d'erreur
    try {
        const result = await User.scope('withPassword').findOne({ where: { username: req.body.username } })
        if (result === null) {
            return res.status(404).json({ message: `Invalid Credentials` })
        }

        // 2. On compare le mot de passe fourni dans le formulaire (dans le req.body) avec le mot de passe contenu dans la bdd
        // Si le mot de passe n'est pas corret, on renvoie une réponse d'erreur
        const isCorrect = await bcrypt.compare(req.body.password, result.password)

        if (!isCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const token = jwt.sign({ userId: result.id }, SECRET_KEY, { expiresIn: '24h' });
        // Si correct, on envoie un message "login réussi"
        res.cookie("access_token", token).json({ message: "Login réussi" })
    } catch (error) {
        errorHandler(error, res)
    }
}

const logout = (req, res) => {
    res.clearCookie('access_token').json({ message: "log out" })
}

module.exports = { login, logout }