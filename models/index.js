//Importing modules to use
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//single User can have many Posts. onnection using the "user_id" field in the Post model, which links to the User's unique identifier.
User.hasMany(Post, {
  foreignKey: "user_id"
});

// Each Post is linked to one User. The "user_id" field in the Post model connects to the User's unique identifier. Deleting the User will also remove their Posts.
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade"
});

// Every Comment is connected to a single User. The "user_id" field in the Comment model links to the User's unique identifier. Deleting the User will also delete their Comments.
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade"
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade" //onDelete: "cascade" option means that when a parent record is deleted, all related child records will also be deleted automatically.
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade"
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade"
});

//exporting to make user, post, and comment object models available to be used in other files.
module.exports = {
  User,
  Post,
  Comment
};
