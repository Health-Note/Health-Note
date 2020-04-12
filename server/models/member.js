/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phoneNum: {
      type: DataTypes.STRING(20),
      allowNull: false
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
    trainerId: {
      type: DataTypes.BIGINT,
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
