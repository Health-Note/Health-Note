/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Account', {
    trainerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    agreementDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    email: {
      unique: true,
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
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
    agreementVersion: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      references: {
        model: 'Agreement',
        key: 'agreementVersion'
      }
    }
  }, {
    tableName: 'Account'
  });
};
