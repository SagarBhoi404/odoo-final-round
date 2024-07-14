const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "librarian", "user"],
      default:"user"
    },
    address:{
      type:String
    },
    mobile:{
      type:String
    },
    password: {
      type: String,
    },
    gid: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
