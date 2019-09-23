/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agreement', {
    AgreementVersion: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    Data: {
      type: DataTypes.TEXT,
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
    tableName: 'agreement'
  });
};
