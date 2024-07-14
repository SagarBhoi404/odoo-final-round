const jwt = require("jsonwebtoken");

// Middleware to check user role
const verifyRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      // console.log(token);
      if (!token) {
        return res
          .status(401)
          .json({ error: true, message: "Unauthorized request" });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ error: true, message: "Forbidden" });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        error: true,
        message: error?.message || "Not access for role",
      });
    }
  };
};

module.exports = verifyRole;
