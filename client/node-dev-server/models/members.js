/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    member_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true
    },
    phonenum: {
      type: DataTypes.CHAR(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    gender: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    unusedpt: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    usedpt: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    trainer_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'trainer',
        key: 'trainer_id'
      }
    }
  }, {
    tableName: 'members'
  });
};
