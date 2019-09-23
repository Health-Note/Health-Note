/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('exercise', {
    ExerciseCode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ExerciseName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Target: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'exercise'
  });
};
