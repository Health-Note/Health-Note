/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trainer', {
    TrainerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: 'account',
        key: 'TrainerId'
      }
    },
    Name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    ManMemberCount: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    WomenMemberCount: {
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
    tableName: 'trainer'
  });
};
