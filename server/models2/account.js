/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    TrainerId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AgreementDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Password: {
      type: DataTypes.CHAR(60),
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
    AgreementVersion: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      references: {
        model: 'agreement',
        key: 'AgreementVersion'
      }
    }
  }, {
    tableName: 'account'
  });
};
