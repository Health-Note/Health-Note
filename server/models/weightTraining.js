module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'weightTraining',
    {
      exerciseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Routine',
          key: 'exerciseId',
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
      weightTargetId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'WeightTarget',
            key: 'id'
          }
      }
    },
    {
      tableName: 'WeightTraining',
    }
  );
};
