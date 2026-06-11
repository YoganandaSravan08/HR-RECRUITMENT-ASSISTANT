const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getJobCount,
} = require("../controllers/jobController");

router.get("/count", getJobCount);

router.post("/", createJob);

router.get("/", getJobs);

module.exports = router;