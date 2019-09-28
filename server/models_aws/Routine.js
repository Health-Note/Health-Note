/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Routine', {
    ExerciseCode: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Exercise',
        key: 'ExerciseCode'
      }
    },
    ScheduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Schedule',
        key: 'ScheduleId'
      }
    },
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Schedule',
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
    tableName: 'Routine'
  });
};
