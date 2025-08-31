import React, { useEffect, useState } from "react";
import axios from "axios";
import OverallStats from "./OverallStats";
import CategoryPerformanceChart from "./CategoryPerformanceChart";
import CategoryAttemptsTable from "./CategoryAttemptsTable";
import TopUsersTable from "./TopUsersTable";

const AnalyticsDashboard = () => {
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [overallStats, setOverallStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [catPerfRes, overallRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/analytics/category/performance/"),
          axios.get("http://127.0.0.1:8000/api/analytics/overall/")
        ]);
        setCategoryPerformance(catPerfRes.data);
        setOverallStats(overallRes.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center p-5">Loading dashboard...</div>;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">📊 Analytics Dashboard</h1>

      {/* Overall Stats */}
      <OverallStats overallStats={overallStats} />

      {/* Category Performance Graph */}
      <div className="mt-4">
        <CategoryPerformanceChart data={categoryPerformance} />
      </div>

      {/* Category Attempts Table */}
      <div className="mt-4">
        <CategoryAttemptsTable data={categoryPerformance} />
      </div>

      {/* Category Attempts Table */}
      <div className="mt-4">
        <TopUsersTable  />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
