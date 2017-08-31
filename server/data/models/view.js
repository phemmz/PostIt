/**
 * View model
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns {*} View
 */
export default (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return View;
};
