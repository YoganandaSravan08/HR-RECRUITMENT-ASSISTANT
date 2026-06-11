import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [requiredSkills, setRequiredSkills] =
    useState("");

  const [openings, setOpenings] =
    useState(1);

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

        requiredSkills:
          requiredSkills
            .split(",")
            .map((skill) =>
              skill.trim()
            ),

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

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-8">
        Jobs
      </h1>

      <form
        onSubmit={createJob}
        className="bg-white shadow-lg rounded-lg p-6 border mb-8"
      >

        <h2 className="text-2xl font-bold mb-4">
          Create New Job
        </h2>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-3 w-full mb-4"
          required
        />

        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
          rows="4"
          required
        />

        <input
          type="text"
          placeholder="React, Node.js, Express.js, MongoDB"
          value={requiredSkills}
          onChange={(e) =>
            setRequiredSkills(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <input
          type="number"
          placeholder="Openings"
          value={openings}
          onChange={(e) =>
            setOpenings(
              e.target.value
            )
          }
          className="border p-3 w-full mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Create Job
        </button>

      </form>

      <h2 className="text-2xl font-bold mb-4">
        Existing Jobs
      </h2>

      <div className="space-y-4">

        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-4 shadow"
          >

            <h3 className="text-xl font-bold">
              {job.title}
            </h3>

            <p className="mt-2">
              {job.description}
            </p>

            <p className="mt-2">
              <strong>
                Skills:
              </strong>{" "}
              {job.requiredSkills.join(
                ", "
              )}
            </p>

            <p>
              <strong>
                Openings:
              </strong>{" "}
              {job.openings}
            </p>

          </div>
        ))}

      </div>

    </Layout>
  );
}

export default Jobs;