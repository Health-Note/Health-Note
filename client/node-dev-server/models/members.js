/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('members', {
    phonenum: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      primaryKey: true
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
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'trainer',
        key: 'email'
      }
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
    }
  }, {
    tableName: 'members'
  });
};
