const express = require("express");
const transaction = require("../controllers/transaction.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");
const router = express.Router();

router.post(
  "/borrow",
  [verifyJWT, verifyRole(["librarian"])],
  transaction.borrowBook
);
router.post(
  "/return",
  [verifyJWT, verifyRole(["librarian"])],
  transaction.returnBook
);
router.get(
  "/",
  [verifyJWT, verifyRole(["librarian"])],
  transaction.getAllTransactions
);
router.get(
  "/user/:userId",
  [verifyJWT, verifyRole(["librarian"])],
  transaction.getUserTransactions
);

module.exports = router;
