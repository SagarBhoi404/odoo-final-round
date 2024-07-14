const express = require("express");
const recommendationController = require("../controllers/recommendation.controller");
const router = express.Router();

router.get("/user/:userId", recommendationController.getUserRecommendations);
router.get("/popular", recommendationController.getPopularRecommendations);

module.exports = router;
