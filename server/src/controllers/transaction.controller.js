const Book = require("../models/book.model");
const Transaction = require("../models/transaction.model");

// Borrow a book
const borrowBook = async (req, res) => {
  const { userId, bookId, dueDate } = req.body;
  if (!userId || !dueDate || !bookId) {
    res.status(400).json({ error: true, message: "All Field Required" });
  } else {
    try {
      const book = await Book.findById(bookId);
      if (!book || book.available <= 0) {
        return res
          .status(400)
          .json({ error: true, message: "Book not available" });
      }

      // Create new transaction
      const newTransaction = new Transaction({
        userId,
        bookId,
        dueDate,
      });

      await newTransaction.save();

      // Update book availability
      book.available -= 1;
      await book.save();

      res.status(200).json({
        error: false,
        message: "Book Borrow Successfully",
        data: newTransaction,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Find the transaction
    const transaction = await Transaction.findById(transactionId).populate(
      "bookId"
    );
    if (!transaction || transaction.returnedOn) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid transaction" });
    }

    // Calculate late fees if any
    const currentDate = new Date();
    let lateFees = 0;
    if (currentDate > transaction.dueDate) {
      const diffDays = Math.ceil(
        (currentDate - transaction.dueDate) / (1000 * 60 * 60 * 24)
      );
      lateFees = diffDays * 10; // Assume Rs.10 per day late fee
    }

    // Update transaction
    transaction.returnedOn = currentDate;
    transaction.lateFees = lateFees;
    await transaction.save();

    // Update book availability
    const book = transaction.bookId;
    book.available += 1;
    await book.save();

    res.status(200).json({
      error: false,
      message: "Book Return Successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(400).json({ error: true, errorMsg: error });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userId bookId");

    res.status(200).json({
      error: false,
      message: "Transaction fetch Successfully",
      data: transactions,
    });
  } catch (error) {
    res.status(400).json({ error: true, errorMsg: error });
  }
};

// Get transactions for a specific user
const getUserTransactions = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).json({ error: true, message: "userId  Required" });
  } else {
    try {
      const transactions = await Transaction.find({ userId }).populate(
        "bookId"
      );

      res.status(200).json({
        error: false,
        message: "Book fetch Successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(400).json({ error: true, errorMsg: error });
    }
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getAllTransactions,
  getUserTransactions,
};
