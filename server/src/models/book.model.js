const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    isbn: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String },
    year: { type: Number },
    genre: { type: String },
    quantity: { type: Number, required: true },
    available: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;
