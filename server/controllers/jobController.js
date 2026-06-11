const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getJobCount = async (req, res) => {
  try {
    const count = await Job.countDocuments();

    res.json({
      totalJobs: count,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};