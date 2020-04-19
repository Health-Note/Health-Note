/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('memo', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Member',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    isAlarm: {
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
    }
  }, {
    tableName: 'Memo'
  });
};
