const { default: mongoose } = require("mongoose");
const DB_NAME = "odoo-final";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Database Connected.");
  } catch (error) {
    console.log("Something Went Wrong : " + error);
  }
};

module.exports = connectDB;
