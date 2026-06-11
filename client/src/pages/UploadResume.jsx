import { useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";

function UploadResume() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Select a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
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

      // Clear selected file after upload
      setFile(null);

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl bg-white p-8 border rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold mb-3">
          Upload Resume 📄
        </h1>

        <p className="text-gray-500 mb-8">
          Upload candidate resumes in PDF format
          for ATS analysis and ranking.
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

        <div className="flex items-center gap-4">

          <label
            htmlFor="resume-upload"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200"
          >
            Choose Resume
          </label>

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Upload Resume
          </button>

        </div>

        {file && (
          <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              📄 {file.name}
            </p>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default UploadResume;
