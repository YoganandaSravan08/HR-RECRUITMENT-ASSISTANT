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
    const candidatesRes = await API.get("/candidates");
    const jobsRes = await API.get("/jobs");

    setCandidates(candidatesRes.data);
    setJobs(jobsRes.data);
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
        <h1 className="text-4xl font-bold mb-2">ATS Analysis 🎯</h1>

        <p className="text-gray-500 mb-6">
          Analyze candidate resumes against job requirements.
        </p>

        <div className="mb-4">
          <select
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            className="border p-3 w-96 rounded-lg shadow-sm"
          >
            <option value="">Select Candidate</option>

            {candidates.map((candidate) => (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="border p-3 w-96 rounded-lg shadow-sm"
          >
            <option value="">Select Job</option>

            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={analyze}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          Analyze Resume
        </button>

        {result && (
          <div className="mt-8 bg-white border rounded-xl shadow-lg p-6">
            <div
              className={`rounded-xl p-6 mb-6 border ${
                result.atsScore >= 90
                  ? "bg-green-100 border-green-300"
                  : result.atsScore >= 70
                    ? "bg-yellow-100 border-yellow-300"
                    : "bg-red-100 border-red-300"
              }`}
            >
              <h2
                className={`text-5xl font-extrabold ${
                  result.atsScore >= 90
                    ? "text-green-700"
                    : result.atsScore >= 70
                      ? "text-yellow-700"
                      : "text-red-700"
                }`}
              >
                ATS Score: {result.atsScore}
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-white/50 rounded-full h-5 mt-5 overflow-hidden">
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
                Match Percentage: {result.atsScore}%
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Matched Skills</h3>

              <ul className="space-y-2">
                {result.matchedSkills.map((skill, index) => (
                  <li key={index}>✅ {skill}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Missing Skills</h3>

              {result.missingSkills.length > 0 ? (
                <ul className="space-y-2">
                  {result.missingSkills.map((skill, index) => (
                    <li key={index}>❌ {skill}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-600 font-semibold">
                  No missing skills 🎉
                </p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">Recommendation</h3>

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
