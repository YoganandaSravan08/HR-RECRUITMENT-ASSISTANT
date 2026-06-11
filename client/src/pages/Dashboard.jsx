import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [jobCount, setJobCount] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const analyticsRes = await API.get("/candidates/analytics");

      const jobsRes = await API.get("/jobs/count");

      setAnalytics(analyticsRes.data);
      setJobCount(jobsRes.data.totalJobs);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500 mt-2">
          Manage recruitment, resumes, ATS analysis and interviews from one
          place.
        </p>
      </div>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            onClick={() => navigate("/candidates")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-gray-500">Total Candidates</h2>

            <p className="text-4xl font-bold text-blue-600">
              {analytics.totalCandidates}
            </p>

            <p className="text-sm text-gray-400 mt-2">Click to view →</p>
          </div>

          <div
            onClick={() => navigate("/jobs")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-gray-500">Total Jobs</h2>

            <p className="text-4xl font-bold text-purple-600">{jobCount}</p>

            <p className="text-sm text-gray-400 mt-2">Click to view →</p>
          </div>

          <div
            onClick={() => navigate("/analytics")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-gray-500">Average ATS Score</h2>

            <p className="text-4xl font-bold text-green-600">
              {analytics.averageATS}
            </p>

            <p className="text-sm text-gray-400 mt-2">Click to view →</p>
          </div>

          <div
            onClick={() => navigate("/candidates")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-gray-500">Top Candidate</h2>

            <p className="text-lg font-bold break-words">
              {analytics.topCandidate?.name}
            </p>

            <p className="text-sm text-gray-400 mt-2">Click to view →</p>
          </div>

          <div
            onClick={() => navigate("/analytics")}
            className="cursor-pointer bg-white shadow-lg rounded-lg p-6 border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-gray-500">Status</h2>

            <p className="text-xl font-bold text-green-600">System Active 🚀</p>

            <p className="text-sm text-gray-400 mt-2">Click to view →</p>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Dashboard;
