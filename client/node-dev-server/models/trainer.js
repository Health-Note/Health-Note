/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainer', {
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'trainer'
  });
};
