import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function InterviewGenerator() {
  const [role, setRole] = useState("");

  const [questions, setQuestions] = useState(null);

  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.post("/interview/generate", { role });

      setQuestions(res.data);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white">
            AI Interview Generator 🤖
          </h1>

          <p className="text-gray-400 mt-2">
            Generate technical, HR and scenario-based interview questions
            instantly.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-white text-gray-900 border border-gray-300 p-4 w-full md:w-96 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={generateQuestions}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300 font-semibold"
          >
            Generate
          </button>
        </div>

        {loading && (
          <div className="mt-6 bg-white rounded-xl p-4 shadow-lg">
            <p className="font-semibold text-blue-600">
              🤖 Generating Questions...
            </p>
          </div>
        )}

        {questions && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                💻 Technical Questions
              </h2>

              <ul>
                {questions.technicalQuestions?.map((q, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 mb-3 rounded-xl shadow-lg border hover:shadow-xl transition duration-300"
                  >
                    <span className="font-bold text-blue-600">
                      Q{index + 1}.
                    </span>{" "}
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                👨‍💼 HR Questions
              </h2>

              <ul>
                {questions.hrQuestions?.map((q, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 mb-3 rounded-xl shadow-lg border hover:shadow-xl transition duration-300"
                  >
                    <span className="font-bold text-blue-600">
                      Q{index + 1}.
                    </span>{" "}
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">
                🎯 Scenario Questions
              </h2>

              <ul>
                {questions.scenarioQuestions?.map((q, index) => (
                  <li
                    key={index}
                    className="bg-white p-4 mb-3 rounded-xl shadow-lg border hover:shadow-xl transition duration-300"
                  >
                    <span className="font-bold text-blue-600">
                      Q{index + 1}.
                    </span>{" "}
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default InterviewGenerator;
