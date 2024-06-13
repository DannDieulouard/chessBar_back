const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Tournament',
        {
            name: {
                type: DataTypes.STRING,
              },
              city: {
                type: DataTypes.STRING,
              },
              game_day: {
                type: DataTypes.STRING,
              },
              game_time: {
                type: DataTypes.STRING,
              },
              players: {
                type: DataTypes.TEXT,
                get() {
                  return this.getDataValue('players') ? this.getDataValue('players').split(';') : [];
                },
                set(val) {
                  this.setDataValue('players', val.join(';'));
                }
              }
        },
        {
            onDelete: 'CASCADE'
            // Other model options go here
        },
    );
}