const express = require("express");
const book = require("../controllers/book.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");
const router = express.Router();


router.post("/add", [verifyJWT, verifyRole(["librarian"])], book.addBook);
router.put("/:id", [verifyJWT, verifyRole(["librarian"])], book.updateBook);
router.get("/all", book.getAllBook);
router.get("/:id", book.getBookByID);
router.delete("/:id", [verifyJWT, verifyRole(["librarian"])], book.deteleBook);



module.exports = router;
