const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadResume,
  getCandidates,
  getAnalytics,
  getCandidateById,
  deleteCandidate,
} = require("../controllers/candidateController");

router.post("/upload", upload.single("resume"), uploadResume);

router.get("/", getCandidates);
router.get("/analytics", getAnalytics);
router.get("/:id", getCandidateById);
router.delete("/:id", deleteCandidate);

module.exports = router;
