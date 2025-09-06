import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import OverallStats from "./OverallStats";
import CategoryPerformanceChart from "./CategoryPerformanceChart";
import CategoryAttemptsTable from "./CategoryAttemptsTable";
import TopUsersTable from "./TopUsersTable";
import DailyTrendsChart from "./DailyTrendsCharts";
import ScoreDistributionChart from "./ScoreDistributionChart";

const AnalyticsDashboard = () => {
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [overallStats, setOverallStats] = useState({});
  const [loading, setLoading] = useState(true);

  token = localStorage.getItem("token");

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("usercategory");
    localStorage.removeItem("refresh_token");
    alert("Logged out successfully!");

    navigate("/")
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        token = localStorage.getItem("token");
        const [catPerfRes, overallRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/analytics/category/performance/", {
            headers: {
              Authorization: `Bearer ${token}`, // JWT token
              "Content-Type": "application/json"
            }
          }),
          axios.get("http://127.0.0.1:8000/api/analytics/overall/", {
            headers: {
              Authorization: `Bearer ${token}`, // JWT token
              "Content-Type": "application/json"
            }
          }),
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
    <div className="container-fluid my-4">
      <h1 className="text-center mb-4">📊 Analytics Dashboard</h1>

      {/* Row 1: Overall Stats */}
      <div className="col">
        <div className="row mb-4">
          <div className="col-12">
            <OverallStats overallStats={overallStats} />
          </div>

        </div>

        {/* Row 2: Chart + Attempts Table */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <CategoryPerformanceChart data={categoryPerformance} />
          </div>
          <div className="col-md-6 mb-3">
            <DailyTrendsChart />
          </div>
          <div className="col-md-6 mb-3">
            <CategoryAttemptsTable data={categoryPerformance} />
          </div>
          <div className="col-md-6 mb-3">
            <ScoreDistributionChart />
          </div>
        </div>


      </div>
      <div className="col">
        {/* Row 3: Top Users Table */}
        <div className="row">
          <div className="col-12">
            <TopUsersTable />
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="position-absolute top-0 end-0 m-3">
        <button className="btn btn-danger px-4" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
