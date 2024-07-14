const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedOn: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnedOn: { type: Date },
    lateFees: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
