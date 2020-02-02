/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Member', {
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    PhoneNum: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Gender: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Height: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TotalPT: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    UsedPT: {
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
    IsRegistered: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    TrainerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Account',
        key: 'TrainerId'
      }
    }
  }, {
    tableName: 'Member'
  });
};
