module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Group.associate = (models) => {
    Group.hasMany(models.Message, {
      foreignKey: 'groupId',
      as: 'messages',
    });
    Group.belongsToMany(models.User, {
      foreignKey: 'groupId',
      through: 'userGroups',
    });
  };
  return Group;
};
