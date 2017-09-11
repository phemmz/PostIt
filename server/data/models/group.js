/**
 * Group model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} Group
 */
export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId',
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'UserGroups',
    });
  };
  return Group;
};
