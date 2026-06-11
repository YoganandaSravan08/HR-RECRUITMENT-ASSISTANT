const Candidate = require("../models/Candidate");
const pdfParse = require("pdf-parse");
const fs = require("fs");

exports.uploadResume = async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    const lines = pdfData.text.split("\n").filter((line) => line.trim() !== "");

    const name = lines[0];

    const emailMatch = pdfData.text.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    );

    const email = emailMatch ? emailMatch[0] : "";
    console.log("Extracted Name:", name);
    console.log("Extracted Email:", email);

    const candidate = await Candidate.create({
      name,
      email,
      resumeText: pdfData.text,
    });

    res.status(201).json({
      message: "Resume Uploaded",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ atsScore: -1 });

    res.status(200).json(candidates);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getAnalytics = async (req, res) => {
  try {
    const totalCandidates = await Candidate.countDocuments();

    const candidates = await Candidate.find();

    const averageATS =
      candidates.length > 0
        ? candidates.reduce((sum, candidate) => sum + candidate.atsScore, 0) /
          candidates.length
        : 0;

    const topCandidate = candidates.sort((a, b) => b.atsScore - a.atsScore)[0];

    res.json({
      totalCandidates,
      averageATS,
      topCandidate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      return res.status(404).json({
        message: "Candidate not found",
      });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteCandidate = async (
  req,
  res
) => {
  try {
    await Candidate.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Candidate deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
