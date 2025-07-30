'use client';

import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import revenueData from '../../data/revenueData.json';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function RevenueChart() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [threshold, setThreshold] = useState(0);

  const filteredData = revenueData.filter((d) => d.revenue >= threshold);

  return (
    <div>
      {/* Chart controls */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Revenue"
          className="border p-1 rounded"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
        <div className="flex gap-2">
          <button onClick={() => setChartType('bar')} className="bg-blue-500 text-white px-2 py-1 rounded">Bar</button>
          <button onClick={() => setChartType('line')} className="bg-green-500 text-white px-2 py-1 rounded">Line</button>
          <button onClick={() => setChartType('pie')} className="bg-pink-500 text-white px-2 py-1 rounded">Pie</button>
        </div>
      </div>

      {/* Chart display */}
      <ResponsiveContainer width="100%" height={300}>
        {chartType === 'bar' && (
          <BarChart data={filteredData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        )}
        {chartType === 'line' && (
          <LineChart data={filteredData}>
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        )}
        {chartType === 'pie' && (
          <PieChart>
            <Pie data={filteredData} dataKey="revenue" nameKey="year" cx="50%" cy="50%" outerRadius={80} label>
              {filteredData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
