/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memo', {
    MemoId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    MemberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'member',
        key: 'MemberId'
      }
    },
    Text: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    IsAlarm: {
      type: DataTypes.INTEGER(4),
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
    tableName: 'memo'
  });
};
