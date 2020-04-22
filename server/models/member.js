/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    memberName: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phoneNum: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalPT: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    usedPT: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accountId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Account',
        key: 'id'
      }
    }
  }, {
    tableName: 'Member'
  });
};
