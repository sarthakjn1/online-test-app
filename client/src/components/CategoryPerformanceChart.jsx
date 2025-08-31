import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CategoryPerformanceChart = ({ data }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Category Performance</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg_score" fill="#000000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPerformanceChart;
