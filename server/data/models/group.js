export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Group.hasMany(models.Message, {
          foreignKey: 'groupId',
          as: 'messages',
        });
        Group.hasMany(models.Users, {
          foreignKey: 'groupId',
          as: 'users',
        });
      },
    },
  });
  return Group;
};
