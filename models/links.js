module.exports = function (sequelize, DataTypes) {
    const Links = sequelize.define("Links", {
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
        bucketListId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return Links;
};