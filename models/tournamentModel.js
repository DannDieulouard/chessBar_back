const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Tournament',
        {
            // Model attributes are defined here
        },
        {
            // options
        },
    );
}