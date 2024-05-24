const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Tournament',
        {
            name: {
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
            // options
        },
    );
}