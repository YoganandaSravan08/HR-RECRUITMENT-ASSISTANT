import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function ATSAnalysis() {
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const candidatesRes = await API.get("/candidates");
      const jobsRes = await API.get("/jobs");

      setCandidates(candidatesRes.data);
      setJobs(jobsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const analyze = async () => {
    try {
      const res = await API.post("/ats/analyze", {
        candidateId,
        jobId,
      });

      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white">
            ATS Analysis 🎯
          </h1>

          <p className="text-gray-400 mt-2">
            Analyze candidate resumes against job requirements.
          </p>
        </div>

        {/* Select Candidate */}
        <div className="mb-4">
          <select
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            className="w-full md:w-[500px] bg-white rounded-xl border border-gray-200 p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Candidate
            </option>

            {candidates.map((candidate) => (
              <option
                key={candidate._id}
                value={candidate._id}
              >
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Job */}
        <div className="mb-6">
          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full md:w-[500px] bg-white rounded-xl border border-gray-200 p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Select Job
            </option>

            {jobs.map((job) => (
              <option
                key={job._id}
                value={job._id}
              >
                {job.title}
              </option>
            ))}
          </select>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyze}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 font-bold"
        >
          🚀 Analyze Resume
        </button>

        {/* Results */}
        {result && (
          <div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">

              <div className="bg-green-50 p-5 rounded-xl">
                <h3 className="font-bold text-green-700">
                  Matched Skills
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {result.matchedSkills.length}
                </p>
              </div>

              <div className="bg-red-50 p-5 rounded-xl">
                <h3 className="font-bold text-red-700">
                  Missing Skills
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {result.missingSkills.length}
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl">
                <h3 className="font-bold text-blue-700">
                  Match %
                </h3>

                <p className="text-3xl font-bold mt-2">
                  {result.atsScore}%
                </p>
              </div>

            </div>

            {/* ATS Score Card */}
            <div
              className={`rounded-2xl p-6 mb-8 border ${
                result.atsScore >= 90
                  ? "bg-green-100 border-green-300"
                  : result.atsScore >= 70
                  ? "bg-yellow-100 border-yellow-300"
                  : "bg-red-100 border-red-300"
              }`}
            >
              <p className="uppercase tracking-widest text-sm mb-2">
                Resume Match Score
              </p>

              <h2
                className={`text-6xl font-black ${
                  result.atsScore >= 90
                    ? "text-green-700"
                    : result.atsScore >= 70
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {result.atsScore}%
              </h2>

              <div className="w-full bg-white/50 rounded-full h-5 mt-6 overflow-hidden">
                <div
                  className={`h-5 rounded-full transition-all duration-1000 ${
                    result.atsScore >= 90
                      ? "bg-green-500"
                      : result.atsScore >= 70
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${result.atsScore}%`,
                  }}
                ></div>
              </div>

              <p className="mt-3 font-semibold text-gray-700">
                Match Percentage : {result.atsScore}%
              </p>
            </div>

            {/* Matched Skills */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                ✅ Matched Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.matchedSkills.map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-red-700 mb-4">
                ❌ Missing Skills
              </h3>

              {result.missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {result.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-green-600 font-semibold">
                  No missing skills 🎉
                </p>
              )}
            </div>

            {/* Recommendation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-700 mb-3">
                🤖 AI Recommendation
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {result.recommendation}
              </p>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
}

export default ATSAnalysis;