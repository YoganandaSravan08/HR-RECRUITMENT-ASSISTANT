const express = require("express");

const router = express.Router();

const {
  createEmail
} = require(
  "../controllers/emailController"
);

router.post(
  "/generate",
  createEmail
);

module.exports = router;