const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  verifyPassword(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  }
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    //async function used to hash the password field before creating a new user record, using the bcrypt library and and returns the updated user details with the hashed password. Do not store plain text passwords.
    hooks: {
      async beforeCreate // beforCreate is a built-in hook provided by Sequelize and cannot be changed to another name.
      (newUserDetails) {
        newUserDetails.password = await bcrypt.hash(newUserDetails.password, 10)
        return newUserDetails
      },
    },
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
)

module.exports = User;
