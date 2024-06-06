const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'City',
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
            imageUrl: {
                type: DataTypes.STRING,
                isUrl: true,
            },
        },
        {
            // options
        },
    );
}