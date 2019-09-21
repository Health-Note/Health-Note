/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'memo',
    {
      no: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      finish_dncd: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phonenum: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        references: {
          model: 'members',
          key: 'phonenum',
        },
      },
    },
    {
      tableName: 'memo',
    }
  );
};
