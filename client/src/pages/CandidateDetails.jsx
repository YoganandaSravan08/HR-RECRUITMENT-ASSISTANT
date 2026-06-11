import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function CandidateDetails() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    try {
      const res = await API.get(`/candidates/${id}`);

      setCandidate(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!candidate) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-6">Candidate Profile 👤</h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{candidate.name}</h2>

        <p className="mb-2">
          <strong>Email:</strong> {candidate.email}
        </p>

        <div
          className={`rounded-lg p-4 mt-4 mb-4 border ${
            candidate.atsScore >= 90
              ? "bg-green-100 border-green-300"
              : candidate.atsScore >= 70
                ? "bg-yellow-100 border-yellow-300"
                : "bg-red-100 border-red-300"
          }`}
        >
          <h3
            className={`text-2xl font-bold ${
              candidate.atsScore >= 90
                ? "text-green-700"
                : candidate.atsScore >= 70
                  ? "text-yellow-700"
                  : "text-red-700"
            }`}
          >
            ATS Score: {candidate.atsScore}
          </h3>

          <p className="mt-2 text-sm text-gray-600">
            {candidate.atsScore >= 90
              ? "Excellent Match 🎉"
              : candidate.atsScore >= 70
                ? "Good Match 👍"
                : "Needs Improvement ⚠️"}
          </p>
        </div>

        <h3 className="font-bold text-xl mb-2">Matched Skills</h3>

        {candidate.matchedSkills?.length > 0 ? (
          <ul className="mb-4">
            {candidate.matchedSkills.map((skill, index) => (
              <li key={index}>✅ {skill}</li>
            ))}
          </ul>
        ) : (
          <p>No matched skills.</p>
        )}

        <h3 className="font-bold text-xl mb-2">Missing Skills</h3>

        {candidate.missingSkills?.length > 0 ? (
          <ul className="mb-4">
            {candidate.missingSkills.map((skill, index) => (
              <li key={index}>❌ {skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No missing skills 🎉</p>
        )}

        <h3 className="font-bold text-xl mb-2">Recommendation</h3>

        <p className="mb-6">{candidate.recommendation}</p>

        <h3 className="font-bold text-xl mb-2">Resume Preview</h3>

        <div className="bg-gray-100 p-4 rounded-lg max-h-80 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{candidate.resumeText}</pre>
        </div>
      </div>
    </Layout>
  );
}

export default CandidateDetails;
