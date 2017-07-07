import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
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

  Account.beforeCreate((Account, options) => {
    Account.password = bcrypt.hashSync(Account.password);
  });

  Account.afterCreate((Account, options) => {
    // console.log('Account created');
  });
  return Account;
};
