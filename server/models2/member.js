/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    PhoneNum: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    Gender: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Height: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    },
    TotalPT: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    UsedPT: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    TrainerId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'account',
        key: 'TrainerId'
      }
    }
  }, {
    tableName: 'member'
  });
};
