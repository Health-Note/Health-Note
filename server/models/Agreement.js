/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Agreement', {
    AgreementVersion: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: DataTypes.STRING(30),
      allowNull: false
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
    tableName: 'Agreement'
  });
};
