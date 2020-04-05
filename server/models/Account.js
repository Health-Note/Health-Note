/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Account', {
    TrainerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AgreementDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Email: {
      unique: true,
      type: DataTypes.STRING(50),
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
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'Agreement',
        key: 'AgreementVersion'
      }
    }
  }, {
    tableName: 'Account'
  });
};
