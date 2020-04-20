/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routine', {
    exerciseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Exercise',
        key: 'id'
      }
    },
    scheduleId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Schedule',
        key: 'id'
      }
    },
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Schedule',
        key: 'memberId'
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
