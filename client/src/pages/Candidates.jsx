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
    const confirmDelete = window.confirm(
      "Delete this candidate?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/candidates/${id}`);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-4xl font-bold">
          Candidate Rankings 👥
        </h1>

        <p className="text-gray-500 mt-2 mb-6">
          View and compare candidates based on ATS performance.
        </p>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search Candidate..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full md:w-96 border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">
                Candidate Name
              </th>

              <th className="p-3">
                Rank
              </th>

              <th className="p-3">
                ATS Score
              </th>

              <th className="p-3">
                Recommendation
              </th>

              <th className="p-3">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCandidates.map(
              (candidate, index) => (
                <tr
                  key={candidate._id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="p-3 font-medium">
                    {candidate.name}
                  </td>

                  <td className="p-3">
                    #{index + 1}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full font-bold ${
                        candidate.atsScore >=
                        90
                          ? "bg-green-100 text-green-700"
                          : candidate.atsScore >=
                              70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {candidate.atsScore}
                    </span>
                  </td>

                  <td className="p-3 text-gray-700">
                    {
                      candidate.recommendation
                    }
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(
                            `/candidates/${candidate._id}`
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition duration-200"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() =>
                          deleteCandidate(
                            candidate._id
                          )
                        }
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {filteredCandidates.length ===
          0 && (
          <div className="mt-6 text-center text-gray-500">
            No candidates found.
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Candidates;
