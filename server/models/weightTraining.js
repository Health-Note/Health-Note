module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'weightTraining',
    {
      exercise_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Routine',
          key: 'exercise_id',
        },
      },
      schedule_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Routine',
          key: 'schedule_id',
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
      weightTarget_id: {
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
