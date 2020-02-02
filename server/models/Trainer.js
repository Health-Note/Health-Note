/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Trainer', {
    TrainerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'Trainer'
  });
};
