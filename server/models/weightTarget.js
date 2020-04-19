module.exports = function(sequelize, DataTypes) {
    return sequelize.define('weightTarget', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      targetName: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    }, {
      tableName: 'WeightTarget'
    });
  };