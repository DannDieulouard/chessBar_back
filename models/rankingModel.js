const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Ranking',
        {
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            // options
        },
    );
}