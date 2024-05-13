const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            // Model attributes are defined here
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 8 et 50.",
                        args: [8, 50]
                    }
                },
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.JSON
            },
            // validation de mail
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        msg: "email incorrect",
                    }
                },
            }
        },
        {
            onDelete: 'CASCADE',
            // Par défaut, tous les getters/finders n'ont plus l'attribut password (server -> client), attention aux méthodes qui mettent à jour/créent un password (client -> server)
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            // L'unique besoin d'un password en get, c'est pour la route login, car on compare le password en bdd avec les données du req.body
            scopes: {
                withPassword: {
                    attributes: {}
                }
            },
            hooks: {
                afterCreate: (record) => {
                    delete record.dataValues.password;
                },
                afterUpdate: (record) => {
                    delete record.dataValues.password;
                },
            }
        },
    );
}
