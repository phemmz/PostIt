module.exports = (sequelize, DataTypes) => {
  const userGroup = sequelize.define('userGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return userGroup;
};
