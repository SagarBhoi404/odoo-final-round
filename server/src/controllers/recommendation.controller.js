const Book = require("../models/book.model");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

// Get recommendations based on user history
const getUserRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId }).populate("bookId");

    const genreCount = {};
    transactions.forEach((transaction) => {
      const genre = transaction.bookId.genre;
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });

    const favoriteGenre = Object.keys(genreCount).reduce(
      (a, b) => (genreCount[a] > genreCount[b] ? a : b),
      null
    );

    if (favoriteGenre) {
      const recommendedBooks = await Book.find({
        genre: favoriteGenre,
        available: { $gt: 0 },
      }).limit(10);
      res.json(recommendedBooks);
    } else {
      res.json([]);
    }
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get recommendations based on popular trends
const getPopularRecommendations = async (req, res) => {
  try {
    const popularBooks = await Transaction.aggregate([
      { $group: { _id: "$bookId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      { $project: { _id: 0, book: 1 } },
    ]);

    res.json(popularBooks.map((pb) => pb.book));
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getUserRecommendations,
  getPopularRecommendations,
};
