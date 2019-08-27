/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routine', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'schedule',
        key: 'date'
      }
    },
    phonenum: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'schedule',
        key: 'phonenum'
      }
    },
    exercisename: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'exercise',
        key: 'exercisename'
      }
    },
    sets: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    reps: {
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
    tableName: 'routine'
  });
};
