const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.find({ _id: decodedToken._id }).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, message: error?.message || "Invalid access token" });
  }
};

module.exports = verifyJWT;
