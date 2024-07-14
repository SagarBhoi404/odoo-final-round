const express = require("express");
const librarianController = require("../controllers/librarian.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const verifyRole = require("../middlewares/role.middleware");
const router = express.Router();

// Add a librarian
router.post('/', librarianController.addLibrarian);

// Update a librarian
router.put('/:id', librarianController.updateLibrarian);

// Delete a librarian
router.delete('/:id', librarianController.deleteLibrarian);

// Get all librarians
router.get('/', librarianController.getAllLibrarians);

module.exports = router;
