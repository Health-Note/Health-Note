module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'weightTraining',
    {
      routineId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Routine',
          key: 'id',
        }
      },
      exerciseCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Routine',
          key: 'exerciseCode',
        },
      },
      scheduleId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Routine',
          key: 'scheduleId',
        },
      },
      memberId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Routine',
          key: 'memberId'
        }
      },
      setCount: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      repetitions: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      maxWeight: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      targetCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
             model: 'Exercise',
             //key: 'targetCode'
          }
      }
    },
    {
      tableName: 'WeightTraining',
    }
  );
};
