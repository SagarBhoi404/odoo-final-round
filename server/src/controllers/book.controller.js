const Book = require("../models/book.model");

const addBook = async (req, res) => {
  const { isbn, title, author, publisher, year, genre, quantity, description } =
    req.body;

  if (
    !isbn ||
    !title ||
    !author ||
    !publisher ||
    !year ||
    !genre ||
    !quantity ||
    !description
  ) {
    res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    try {
      const newBook = new Book({
        isbn,
        title,
        author,
        publisher,
        year,
        genre,
        quantity,
        description,
        available: quantity,
      });
      await newBook.save();

      res.status(200).json({
        error: false,
        message: "Book Added Successfully",
        data: newBook,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const updateBook = async (req, res) => {
  // const { isbn, title, author, publisher, year, genre, quantity, description } =
  //   req.body;

  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: true, message: "Id Required" });
  } else {
    try {
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        error: false,
        message: "Book Update Successfully",
        data: updatedBook,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const getAllBook = async (req, res) => {
  try {
    const { title, author, genre, isbn } = req.query;
    const filter = {};
    if (title) filter.title = new RegExp(title, "i");
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");
    if (isbn) filter.isbn = isbn;

    const books = await Book.find(filter);

    res.status(200).json({
      error: false,
      message: "Book fetch Successfully",
      data: books,
    });
  } catch (error) {
    res.status(400).json({ error: true, errorMsg: error });
  }
};

const getBookByID = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: true, message: "Id Required" });
  } else {
    try {
      const book = await Book.findById(id);
      if (!book)
        return res
          .status(404)
          .json({ error: false, message: "Book not found" });

      res.status(200).json({
        error: false,
        message: "Book fetch Successfully",
        data: books,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

const deteleBook = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({ error: true, message: "Id Required" });
  } else {
    try {
      const deletedBook = await Book.findByIdAndDelete(id);

      if (!deletedBook)
        return res
          .status(404)
          .json({ error: false, message: "Book not found" });

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
  addBook,
  updateBook,
  getAllBook,
  getBookByID,
  deteleBook,
};
