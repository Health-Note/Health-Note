/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('biologicalHistory', {
    memberId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Member',
        key: 'id'
      }
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    currentWeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentHeight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'BiologicalHistory'
  });
};
