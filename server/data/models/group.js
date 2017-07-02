export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Groups', {
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
      },
      associate: (models) => {
        Group.hasMany(models.Users, {
          foreignKey: 'groupId',
          as: 'users',
        });
      },
    },
  });
  return Group;
};
