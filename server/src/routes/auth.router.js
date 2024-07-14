const express = require("express");
const auth = require("../controllers/auth.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const passport = require("passport");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/register", auth.register);
// router.post("/register/google", auth.registerGoogle);
router.post("/login", auth.login);
router.get("/getAllUser", auth.getAllUser);

router.get("/user", verifyJWT, auth.getCurrentUser);
// router.post("/changepassword", verifyJWT, auth.changeCurrentPassword);

router.get("/login/success", async (req, res) => {
  console.log(req.user.displayName, req.user.emails[0].value, req.user.id);
  if (req.user) {
    try {
      let user;
      user = await User.findOne({
        email: req.user.emails[0].value,
      });

      if (!user) {
        user = await User.create({
          name: req.user.displayName,
          email: req.user.emails[0].value,
          gid: req.user.id,
        });
      }
      const accessToken = await jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      res.redirect(
        `http://localhost:5173/google/signup/success/${accessToken}`
      );
    } catch (error) {
      res.redirect(`http://localhost:5173/google/signin/error`);
    }
  } else {
    res.redirect(`http://localhost:5173/google/signin/error`);
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
