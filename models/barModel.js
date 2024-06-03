const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Bar',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: {
                        msg: "Le nom doit avoir un nombre de caractères compris entre 3 et 50.",
                        args: [3, 50]
                    }
                },
            },
            city: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            imageUrl: {
                type: DataTypes.STRING,
            },
            website: {
                type: DataTypes.STRING,
            },
            phone: {
                type: DataTypes.STRING,
            },
            game_day: {
                type: DataTypes.STRING,
            },
            game_time: {
                type: DataTypes.STRING,
            },
        },
        {
            onDelete: 'CASCADE'
            // Other model options go here
        },
    );
}
