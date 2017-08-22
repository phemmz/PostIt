/**
 * UserGroup model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} UserGroup
 */
export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  });
  return UserGroup;
};
