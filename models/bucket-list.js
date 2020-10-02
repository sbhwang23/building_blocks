module.exports = function (sequelize, DataTypes) {
  const BucketList = sequelize.define("BucketList", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collaborators: {
      type: DataTypes.BOOLEAN
    },
    location: {
      type: DataTypes.STRING
    }
  });

  BucketList.associate = function(models) {
    BucketList.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return BucketList;

};
