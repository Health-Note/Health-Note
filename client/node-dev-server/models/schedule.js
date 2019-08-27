/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedule', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
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
    start_time: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    end_time: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    finish_dncd: {
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
    tableName: 'schedule'
  });
};
