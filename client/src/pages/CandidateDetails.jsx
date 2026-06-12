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
        <div className="text-center text-xl">
          Loading Candidate...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white">
          Candidate Profile 👤
        </h1>

        <p className="text-gray-400 mt-2">
          Detailed candidate ATS analysis and resume review.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-8">

        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {candidate.name?.charAt(0)}
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {candidate.name}
            </h2>

            <p className="text-gray-600 mt-1">
              📧 {candidate.email}
            </p>
          </div>
        </div>

        {/* ATS Score */}
        <div
          className={`rounded-2xl p-6 mb-8 border ${
            candidate.atsScore >= 90
              ? "bg-green-100 border-green-300"
              : candidate.atsScore >= 70
              ? "bg-yellow-100 border-yellow-300"
              : "bg-red-100 border-red-300"
          }`}
        >
          <h3
            className={`text-4xl font-bold ${
              candidate.atsScore >= 90
                ? "text-green-700"
                : candidate.atsScore >= 70
                ? "text-yellow-700"
                : "text-red-700"
            }`}
          >
            ATS Score: {candidate.atsScore}
          </h3>

          <p className="mt-3 text-lg text-gray-700">
            {candidate.atsScore >= 90
              ? "Excellent Match 🎉"
              : candidate.atsScore >= 70
              ? "Good Match 👍"
              : "Needs Improvement ⚠️"}
          </p>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">

          {/* Matched Skills */}
          <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              ✅ Matched Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {candidate.matchedSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-4">
              ❌ Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">
              {candidate.missingSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Recommendation */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-blue-700 mb-3">
            🤖 AI Recommendation
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {candidate.recommendation}
          </p>
        </div>

        {/* Resume */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            📄 Resume Preview
          </h3>

          <div className="bg-gray-100 border rounded-xl p-5 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-gray-800">
              {candidate.resumeText}
            </pre>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CandidateDetails;
