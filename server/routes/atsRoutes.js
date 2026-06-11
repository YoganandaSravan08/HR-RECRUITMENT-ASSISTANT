const express = require("express");

const router = express.Router();

const {
  analyzeCandidate,
} = require(
  "../controllers/atsController"
);

router.post(
  "/analyze",
  analyzeCandidate
);

module.exports = router;