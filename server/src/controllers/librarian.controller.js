const User = require("../models/user.model");

const addLibrarian = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: true, message: "User already exists" });
      }

      // Create new librarian
      user = new User({
        name,
        email,
        password,
        role: "librarian",
      });

      await user.save();

      res.status(200).json({
        error: false,
        message: "Add Librrian Successfully",
        data: newBook,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const updateLibrarian = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: true, message: "Id Required" });
  } else {
    try {
      const updates = req.body;

      const user = await User.findByIdAndUpdate(id, updates, { new: true });

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Librarian not found" });
      }

      res.status(200).json({
        error: false,
        message: "Librarian Update Successfully",
        data: updatedBook,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const getAllLibrarians = async (req, res) => {
  try {
     const librarians = await User.find({ role: "librarian" });

    res.status(200).json({
      error: false,
      data: librarians,
    });
  } catch (error) {
    res.status(400).json({ error: true, errorMsg: error });
  }
};


const deleteLibrarian = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: true, message: "Id Required" });
  } else {
    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res
          .status(404)
          .json({ error: true, message: "Librarian not found" });
      }

      res.status(200).json({
        error: false,
        message: "Book delete Successfully",
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

module.exports = {
  addLibrarian,
  updateLibrarian,
  getAllLibrarians,
  deleteLibrarian,
};
