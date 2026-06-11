import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function InterviewGenerator() {
  const [role, setRole] = useState("");

  const [questions, setQuestions] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const generateQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.post(
        "/interview/generate",
        { role }
      );

      setQuestions(res.data);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
   <Layout>  
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Interview Generator
      </h1>

      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="border p-3 w-96 rounded"
        />

        <button
          onClick={generateQuestions}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Generate
        </button>

      </div>

      {loading && (
        <p>Generating Questions...</p>
      )}

      {questions && (
        <div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">
              Technical Questions
            </h2>

            <ul>
              {questions.technicalQuestions?.map(
                (q, index) => (
                  <li
                    key={index}
                    className="border p-3 mb-2 rounded"
                  >
                    {q}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3">
              HR Questions
            </h2>

            <ul>
              {questions.hrQuestions?.map(
                (q, index) => (
                  <li
                    key={index}
                    className="border p-3 mb-2 rounded"
                  >
                    {q}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Scenario Questions
            </h2>

            <ul>
              {questions.scenarioQuestions?.map(
                (q, index) => (
                  <li
                    key={index}
                    className="border p-3 mb-2 rounded"
                  >
                    {q}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      )}
    </div>
   </Layout>  
  );
}

export default InterviewGenerator;