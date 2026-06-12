import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const res = await API.get(
      "/analytics/dashboard"
    );

    setData(res.data);
  };

  if (!data)
    return (
      <Layout>
        <h1 className="p-8 text-xl">
          Loading...
        </h1>
      </Layout>
    );

  const chartData =
    data.candidates?.map(
      (candidate) => ({
        name:
          candidate.name
            ?.split(" ")[0],
        ats:
          candidate.atsScore,
      })
    ) || [];

  return (
    <Layout>
      <div className="p-8">

        <h1 className="text-4xl font-bold mb-8">
          Analytics Dashboard 📊
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition">
            <h2 className="text-gray-500">
              👥 Total Candidates
            </h2>

            <p className="text-4xl font-bold text-blue-600">
              {
                data.totalCandidates
              }
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition">
            <h2 className="text-gray-500">
              🎯 Average ATS
            </h2>

            <p className="text-4xl font-bold text-green-600">
              {Math.round(
                data.averageATS
              )}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border hover:shadow-2xl transition">
            <h2 className="text-gray-500">
              🏆 Top Candidate
            </h2>

            <p className="font-bold">
              {
                data.topCandidate
                  ?.name
              }
            </p>
          </div>

        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">

          <h2 className="text-2xl font-bold mb-6">
            ATS Score Distribution
          </h2>

          <div className="h-96">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={chartData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="ats"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </div>
    </Layout>
  );
}

export default Analytics;