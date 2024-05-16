const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'City',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
            }
        },
        {
            // options
        },
    );
}