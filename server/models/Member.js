/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    phoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    totalPT: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    usedPT: {
      type: DataTypes.INTEGER(11),
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
    registration: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    trainerId: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'trainerId'
      }
    }
  }, {
    tableName: 'Member'
  });
};
