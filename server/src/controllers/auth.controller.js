const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, address, mobile } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        name,
        email,
        address,
        mobile,
        password: hashPassword,
      });

      // Remove the password field before sending the response
      const userObj = user.toObject();
      delete userObj.password;

      res.status(200).json({
        error: false,
        message: "User Register Successfully",
        User: userObj,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    try {
      const user = await User.findOne({
        email,
      });

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res
          .status(400)
          .json({ error: true, message: "Incorrect Password" });
      }

      // Remove the password field before sending the response
      const userObj = user.toObject();
      delete userObj.password;

      const accessToken = await jwt.sign(
        {
          _id: userObj._id,
          name: userObj.name,
          email: userObj.email,
          role: userObj.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      res.status(200).json({
        error: false,
        message: "User Login Successfully",
        token: accessToken,
        User: userObj,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const getCurrentUser = async (req, res) => {
  return res
    .status(200)
    .json({ user: req.user, message: "User fetched successfully" });
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    const user = await User.findById(req.user[0]?._id);
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid old password" });
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      {
        _id: user._id,
      },
      {
        password: newHashPassword,
      }
    );

    return res
      .status(200)
      .json({ error: false, message: "Password changed successfully" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const { name, email } = req.query;
    const filter = { role: "user" }; // Ensure we only find users with role 'user'
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");

    const users = await User.find(filter);

    res.status(200).json({
      error: false,
      message: "Book fetch Successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({ error: true, errorMsg: error });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  changeCurrentPassword,
  getAllUser,
};
