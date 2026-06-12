import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);

      const res = await API.post(
        "/candidates/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      setFile(null);

      document.getElementById(
        "resume-upload"
      ).value = "";

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Upload Resume 📄
        </h1>

        <p className="text-gray-500 mt-2">
          Upload candidate resumes for ATS
          analysis and ranking.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-10 shadow-2xl border hover:shadow-blue-200 transition duration-300 max-w-4xl">

        <div className="border-2 border-dashed border-blue-300 rounded-2xl p-12 text-center bg-blue-50">

          <div className="text-7xl mb-4">
            ☁️⬆️
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Upload Candidate Resume
          </h2>

          <p className="text-gray-500 mt-2">
            PDF files supported
          </p>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="resume-upload"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
          />

          <label
            htmlFor="resume-upload"
            className="inline-block mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-gray-700 transition"
          >
            Browse Resume
          </label>

        </div>

        {file && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">

            <h3 className="font-bold text-green-700 mb-2">
              Selected File
            </h3>

            <p className="text-green-700">
              📄 {file.name}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Size:{" "}
              {(
                file.size /
                1024
              ).toFixed(2)}{" "}
              KB
            </p>

          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-6 w-full py-4 rounded-xl text-white font-bold text-lg transition ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading
            ? "Uploading..."
            : "🚀 Upload Resume"}
        </button>

        <div className="mt-8 grid md:grid-cols-3 gap-4">

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-blue-700">
              ATS Analysis
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Resume automatically analyzed
              against job requirements.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-bold text-green-700">
              Skill Matching
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Detects matched and missing
              skills instantly.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-bold text-purple-700">
              Candidate Ranking
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Candidates ranked based on
              ATS performance.
            </p>
          </div>

        </div>

      </div>
    </Layout>
  );
}

export default UploadResume;