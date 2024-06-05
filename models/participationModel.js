const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Participation',
        {
            score: {
                type: DataTypes.INTEGER,
            },
        },
        {
            onDelete: 'CASCADE'
            // Other model options go here
        },
    );
}