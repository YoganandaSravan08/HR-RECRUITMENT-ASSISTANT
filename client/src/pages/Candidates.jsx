import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function Candidates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await API.get("/candidates");
      setCandidates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCandidate = async (id) => {
    const confirmDelete = window.confirm("Delete this candidate?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Candidate Rankings 👥</h1>

        <p className="text-gray-500 mt-2 mb-6">
          View and compare candidates based on ATS performance.
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, index) => (
            <div
              key={candidate._id}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {candidate.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Rank #{index + 1}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full font-bold ${
                    candidate.atsScore >= 80
                      ? "bg-green-100 text-green-700"
                      : candidate.atsScore >= 60
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {candidate.atsScore}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  AI Recommendation
                </h4>

                <p className="text-gray-600 text-sm line-clamp-4">
                  {candidate.recommendation}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/candidates/${candidate._id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  View Details
                </button>

                <button
                  onClick={() => deleteCandidate(candidate._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCandidates.length === 0 && (
          <div className="mt-6 text-center text-gray-500">
            No candidates found.
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Candidates;
