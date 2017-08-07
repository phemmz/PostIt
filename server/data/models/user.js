import bcrypt from 'bcrypt-nodejs';

/**
 * Group model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} User
 */
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

  User.beforeCreate((User) => {
    User.password = bcrypt.hashSync(User.password);
  });

  User.associate = (models) => {
    User.belongsToMany(models.Group, {
      foreignKey: 'userId',
      through: 'UserGroups',
    });
  };
  return User;
};
