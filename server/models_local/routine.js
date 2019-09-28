/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routine', {
    ExerciseCode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exercise',
        key: 'ExerciseCode'
      }
    },
    ScheduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'schedule',
        key: 'ScheduleId'
      }
    },
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'schedule',
        key: 'MemberId'
      }
    },
    SetCount: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Repetitions: {
      type: DataTypes.INTEGER(4),
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
    tableName: 'routine'
  });
};
