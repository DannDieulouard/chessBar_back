const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'User',
        {
            // Model attributes are defined here
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {msg: "Enregistrement impossible : ce pseudo est déjà utilisé."},
                validate: {
                    notEmpty: {msg: "Le champ 'Pseudo' ne peut être vide."}
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,   
                unique: {msg: "Enregistrement impossible : cet email est déjà utilisé."},
                validate: {
                    isEmail: {
                        msg: "email incorrect",
                    },
                    notEmpty: {msg: "Le champ 'Email' ne peut être vide."}
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [8, 64], // Ensures the password is between 8 and 64 characters long
                    notEmpty: {msg: "Le champ 'mot de passe' ne peut être vide."}
                }
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: "Le champ 'Prénom' ne peut être vide."}
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {msg: "Le champ 'Nom' ne peut être vide."}
                }
            },
            postCode: {
                type: DataTypes.INTEGER,
                validate: {
                    isNumeric: true,
                    len: [5, 5],
                    min: 10000,
                    max: 99999 
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    len: [10, 10],
                    notEmpty: {msg: "Le champ 'Téléphone' ne peut être vide."}
                }
            },
            city: {
                type: DataTypes.STRING
            },
            howChessbar: {
                type: DataTypes.TEXT
            },
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
