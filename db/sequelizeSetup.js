// CONFIG DB
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')
const BarModel = require('../models/barModel')
const UserModel = require('../models/userModel')
const RoleModel = require('../models/roleModel')
const cityModel = require('../models/cityModel');
const rankingModel = require('../models/rankingModel');
const tournamentModel = require('../models/tournamentModel');
const participationModel = require('../models/participationModel');
const mockBars = require('./bars');
const mockUsers = require('../configs/users');
const mockCities = require('./cities');
const mockRankings = require('./rankings');
const mockTournaments = require('./tournaments');
const mockParticipations = require('./participations');
const env = process.env.NODE_ENV;
const config = require('../configs/db-config.json')[env];


// Option: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false
});

const Bar = BarModel(sequelize);
const User = UserModel(sequelize);
const Role = RoleModel(sequelize);
const City = cityModel(sequelize);
const Ranking = rankingModel(sequelize);
const Tournament = tournamentModel(sequelize);
const Participation = participationModel(sequelize);

// Par défaut, tous les utilisateurs créés sont "user"
Role.hasMany(User, {    
    foreignKey: {
        defaultValue: 3,
    },
});
User.belongsTo(Role);

User.hasMany(Participation)
Participation.belongsTo(User)

Tournament.hasMany(Participation)
Participation.belongsTo(Tournament)

Bar.hasMany(Tournament)
Tournament.belongsTo(Bar)

City.hasMany(Bar);
Bar.belongsTo(City);

const resetDb = process.env.NODE_ENV === "development"

sequelize.sync({ force: resetDb })
    .then(() => {
        mockBars.forEach(bar => {
            Bar.create(bar)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })

        Role.create({ id: 1, label: "superadmin" })
        Role.create({ id: 2, label: "admin" })
        Role.create({ id: 3, label: "user" })

        mockUsers.forEach(async user => {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            User.create(user)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })

        mockCities.forEach(city => {
            City.create(city)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })

        mockRankings.forEach(ranking => {
            Ranking.create(ranking)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
        mockTournaments.forEach(tournament => {
            Tournament.create(tournament)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
        mockParticipations.forEach(participation => {
            Participation.create(participation)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
    })
    .catch((error) => {
        console.log(error)
    })

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, Bar, User, Role, City, Tournament, Ranking, Participation }