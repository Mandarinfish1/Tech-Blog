const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //primary key for a database table. Unique identifier for each record in the table and is used to fetch and update records in the database.
      allowNull: false,
      autoIncrement: true,
    },
    comment_section: {
      type: DataTypes.STRING,
      validate: {
        len: [3],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true, //name of the database table associated with the model will not be changed. (keeping the original casing, pluralization, or other naming) If freezeTableName is not set to true then the naming of the database table will be change.
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
