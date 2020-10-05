module.exports = function (sequelize, DataTypes) {
    const SavedBucketList = sequelize.define("SavedBucketList", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      collaborators: {
        type: DataTypes.BOOLEAN
      },
      location_id: {
        type: DataTypes.STRING
      },
      location_name: {
        type: DataTypes.STRING
      },
      UserId: {
          type: DataTypes.INTEGER
      }
    });
  
    return SavedBucketList;
  
  };