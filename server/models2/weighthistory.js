/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weighthistory', {
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'member',
        key: 'MemberId'
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      primaryKey: true
    },
    TargetWeight: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    CurrentWeight: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    IsSuccess: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'weighthistory'
  });
};
