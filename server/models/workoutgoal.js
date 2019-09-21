/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workoutgoal', {
    exercisename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exercise',
        key: 'exercisename'
      }
    },
    phonenum: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'members',
        key: 'phonenum'
      }
    },
    target_weight: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    current_weight: {
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
    tableName: 'workoutgoal'
  });
};
