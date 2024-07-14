const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
require("./config/passport");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger-output.json");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "somesessionkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Import Routers
const authRouter = require("./routes/auth.router");
const bookRouter = require("./routes/book.router");
const transactionsRouter = require("./routes/transaction.router");
const recommendationRouter = require("./routes/recommendation.router");
const librarianRoutes = require("./routes/librarian.router");

app.use("/api/auth/", authRouter);
app.use("/api/book/", bookRouter);
app.use("/api/transactions/", transactionsRouter);
app.use("/api/recommendations", recommendationRouter);
app.use("/api/librarians", librarianRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
