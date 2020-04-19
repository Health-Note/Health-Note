/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routine', {
    exercise_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Exercise',
        key: 'id'
      }
    },
    schedule_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Schedule',
        key: 'id'
      }
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Schedule',
        key: 'member_id'
      }
    },
    routineOrder: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isCardio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cardioTime: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    tableName: 'Routine'
  });
};
