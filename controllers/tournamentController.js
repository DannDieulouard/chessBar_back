const { Tournament } = require("../db/sequelizeSetup")
const { errorHandler } = require("../errorHandler/errorHandler")

const findAllTournaments = async (req, res) => {
    try {
        const result = await Tournament.findAll()
        res.json({ message: `Il y a ${result.length} tournois`, data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const findTournamentByPk = async (req, res) => {
    try {
        const result = await Tournament.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `Le tournoi n'existe pas` })
        }
        
        res.json({ message: 'Tournoi trouvé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const createTournament = async (req, res) => {
    try {
        req.body.UserId = req.user.id
        const newTournament = await Tournament.create(req.body)
        res.status(201).json({ message: `Un avis a bien été ajouté`, data: newTournament })
    } catch (error) {
        errorHandler(error, res)
    }
}

const updateTournament = async (req, res) => {
    try {
        const result = await Tournament.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        await result.update(req.body)
        res.status(201).json({ message: 'Tournament modifié', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteTournament = async (req, res) => {
    try {
        const result = await Tournament.findByPk(req.params.id);
        if (!result) {
            return res.status(404).json({ message: `L'avis n'existe pas` })
        }
        result.destroy()
        res.status(200).json({ message: 'Tournament supprimé', data: result })
    } catch (error) {
        errorHandler(error, res)
    }
}

const subscribeTournament = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
  
    try {
      const tournament = await Tournament.findByPk(id);
      if (tournament) {
        const players = tournament.players;
        if (players.length < 6) {
          players.push(username);
          tournament.players = players;
          await tournament.save();
          res.json({ success: true, tournament });
        } else {
          res.status(400).json({ success: false, message: 'Tournament is full' });
        }
      } else {
        res.status(404).json({ success: false, message: 'Tournament not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
  }

module.exports = { findAllTournaments, findTournamentByPk, createTournament, updateTournament, deleteTournament, subscribeTournament }