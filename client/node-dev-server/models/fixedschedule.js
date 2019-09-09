/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fixedschedule', {
    day: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'members',
        key: 'member_id'
      }
    },
    start_time: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    end_time: {
      type: DataTypes.CHAR(4),
      allowNull: true
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
    tableName: 'fixedschedule'
  });
};
