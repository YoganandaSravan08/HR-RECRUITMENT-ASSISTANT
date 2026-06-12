import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [requiredSkills, setRequiredSkills] = useState("");

  const [openings, setOpenings] = useState(1);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");

      setJobs(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();

    try {
      await API.post("/jobs", {
        title,
        description,

        requiredSkills: requiredSkills.split(",").map((skill) => skill.trim()),

        openings,
      });

      setTitle("");
      setDescription("");
      setRequiredSkills("");
      setOpenings(1);

      fetchJobs();

      toast.success("Job Created Successfully 🚀");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Jobs Management 💼</h1>

        <p className="text-gray-400 mt-2">
          Create and manage job openings for candidates.
        </p>
      </div>

      <form
        onSubmit={createJob}
        className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl mb-8 hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Create New Job
        </h2>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="React, Node.js, Express.js, MongoDB"
          value={requiredSkills}
          onChange={(e) => setRequiredSkills(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Openings"
          value={openings}
          onChange={(e) => setOpenings(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          Create Job
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Available Positions 🚀</h2>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-2xl p-6 shadow-lg border hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {job.title}
            </h3>

            <p className="text-gray-700 leading-relaxed mb-4">
              {job.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {job.openings} Openings
              </span>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Jobs;
