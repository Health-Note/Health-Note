/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    trainerId: {
      type: DataTypes.BIGINT,
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
    trainerName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    manMemberCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    womenMemberCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trainerMemo: {
      type: DataTypes.STRING(100),
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    agreementVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Agreement',
        key: 'agreementVersion'
      }
    }
  }, {
    paranoid: true, // deletedAt 의 사용
    tableName: 'Account'
  });
};
