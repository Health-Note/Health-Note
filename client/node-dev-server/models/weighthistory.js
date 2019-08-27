/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weighthistory', {
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
    weight: {
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
    tableName: 'weighthistory'
  });
};
