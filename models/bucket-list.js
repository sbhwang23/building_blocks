module.exports = function (sequelize, DataTypes) {
  const BucketList = sequelize.define("BucketList", {
    userId: {
      type: DataTypes.STRING
    },
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

  return BucketList;

};
