/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exercise', {
    exerciseCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    exerciseName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    targetCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetName: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    tableName: 'Exercise'
  });
};
