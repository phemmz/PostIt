module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    username:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  return Account;
};