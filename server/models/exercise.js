/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exercise', {
    exercisename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    target: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'exercise'
  });
};
