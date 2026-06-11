import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";
import Layout from "../components/Layout";

function Analytics() {

  const [data, setData] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics =
    async () => {

      const res =
        await API.get(
          "/analytics/dashboard"
        );

      setData(res.data);
    };

  if (!data)
    return <h1>Loading...</h1>;

  return (
   <Layout>
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="border p-4 rounded">
          <h2>
            Total Candidates
          </h2>

          <p className="text-3xl">
            {
              data.totalCandidates
            }
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>
            Average ATS
          </h2>

          <p className="text-3xl">
            {
              Math.round(
                data.averageATS
              )
            }
          </p>
        </div>

        <div className="border p-4 rounded">
          <h2>
            Top Candidate
          </h2>

          <p>
            {
              data.topCandidate
                ?.recommendation
            }
          </p>
        </div>

      </div>
    </div>
   </Layout> 
  );
}

export default Analytics;