import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FF8042', '#00C49F', '#0088FE'];

const ScoreDistributionChart = () => {
  const [data, setData] = useState([]);

  token = localStorage.getItem("token");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/analytics/user/score-distribution/', {
      headers: {
        Authorization: `Bearer ${token}`, // JWT token
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        const formatted = Object.entries(res.data).map(([name, value]) => ({
          name, value
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mb-4">
      <h5>Score Distribution in % (Number of Attempts)</h5>
      <PieChart width={400} height={300}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={120} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <br />
        <Tooltip />

        <Legend />
      </PieChart>
    </div>
  );
};

export default ScoreDistributionChart;
