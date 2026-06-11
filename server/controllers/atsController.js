const Candidate = require("../models/Candidate");
const Job = require("../models/Job");

const {
  generateATSAnalysis,
} = require("../services/groqService");

exports.analyzeCandidate = async (
  req,
  res
) => {
  try {
    const { candidateId, jobId } = req.body;

    const candidate =
      await Candidate.findById(candidateId);

    const job =
      await Job.findById(jobId);

    if (!candidate || !job) {
      return res.status(404).json({
        message:
          "Candidate or Job not found",
      });
    }

    const aiResponse =
      await generateATSAnalysis(
        candidate.resumeText,
        job.description
      );

    const cleanedResponse = aiResponse
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const parsedResponse =
  JSON.parse(cleanedResponse);

    candidate.atsScore =
      parsedResponse.atsScore;

    candidate.matchedSkills =
      parsedResponse.matchedSkills;

    candidate.missingSkills =
      parsedResponse.missingSkills;

    candidate.recommendation =
      parsedResponse.recommendation;

    await candidate.save();

    res.json(parsedResponse);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};