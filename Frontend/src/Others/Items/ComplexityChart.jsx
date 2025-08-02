import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const complexityMap = {
  "O(1)": 1,
  "O(logn)": 2,
  "O(n)": 3,
  "O(nlogn)": 4,
  "O(n^2)": 5,
  "O(n^3)": 6,
  "O(2^n)": 7,
  "O(n!)": 8
};

const valueToComplexity = Object.fromEntries(
  Object.entries(complexityMap).map(([key, val]) => [val, key])
);

const ComplexityChart = ({ time, space }) => {
  const data = [
    { name: 'Time', value: complexityMap[time] || 0 },
    { name: 'Space', value: complexityMap[space] || 0 },
  ];

  return (
    <BarChart width={300} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        tickFormatter={(tick) => valueToComplexity[tick] || ''}
        domain={[1, 8]}
        ticks={[1, 2, 3, 4, 5, 6, 7, 8]}
      />
      <Tooltip
        formatter={(value) => valueToComplexity[value] || value}
      />
      <Bar dataKey="value" fill="#525252ff" />
    </BarChart>
  );
};

export default ComplexityChart;
