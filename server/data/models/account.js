import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      len: [5, 30],
      allowNull: false,
    }
  });

  User.beforeCreate((User, options) => {
    User.password = bcrypt.hashSync(User.password);
  });

  User.afterCreate((User, options) => {
    // console.log('Account created');
  });
  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      through: 'userGroups',
      foreignKey: 'userId'
    });
  };
  return User;
};
