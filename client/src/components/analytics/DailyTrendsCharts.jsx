import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DailyTrendsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/analytics/user/daily-trends/')
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, []);

  return (
    <div className="mb-4">
      <h5>Daily Quiz Attempts (Last 7 Days)</h5>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="attempts" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default DailyTrendsChart;
