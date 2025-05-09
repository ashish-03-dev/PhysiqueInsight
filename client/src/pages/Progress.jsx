import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import API from '../utils/api';

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [measurements, setMeasurements] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMeasurements();
    };

    fetchData();
  }, []);


  const fetchMeasurements = async () => {
    try {
      const res = await API.get('/measurements');
      const data = res.data;

      // Optional: Sort latest to oldest
      const sorted = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      setMeasurements(sorted);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch measurements:', err);
      setLoading(false);
    }
  };


  const getFilteredMeasurements = () => {
    const now = new Date();
    if (filter === 'month') {
      return measurements.filter((m) => {
        const date = new Date(m.createdAt);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      });
    } else if (filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return measurements.filter((m) => new Date(m.createdAt) >= oneWeekAgo);
    }
    return measurements;
  };

  const prepareChartData = (field) => {
    const filtered = getFilteredMeasurements();

    return {
      labels: filtered.map((m) => new Date(m.createdAt).toLocaleDateString()),
      datasets: [
        {
          label: field.charAt(0).toUpperCase() + field.slice(1),
          data: filtered.map((m) => m.measurements[field]),
          fill: false,
          borderColor: '#0d6efd',
          backgroundColor: '#0d6efd',
          tension: 0.3,
        },
      ],
    };
  };


  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
      },
    },
  };

  const groupedFields = {
    'Upper Body': [
      'shoulderWidth',
      'chestWidth',
      'chestCircumference',
      'waistCircumference'
    ],
    'Arms': [
      'bicepCircumferenceLeft',
      'bicepCircumferenceRight',
      'forearmCircumferenceLeft',
      'forearmCircumferenceRight'
    ],
    'Legs': [
      'thighCircumferenceLeft',
      'thighCircumferenceRight',
      'calfCircumferenceLeft',
      'calfCircumferenceRight'
    ],
    'Full Body': [
      'height',
      'torsoLength',
      'legLength',
      'armSpan'
    ]
  };



  const formatFieldName = (field) => {
    return field
      .replace(/([a-z])([A-Z])/g, '$1 $2')   // Insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  };


  return (
    <div className="container mt-5">


      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="mb-4">Progress</h1>
        <div className="d-flex justify-content-end mb-4">
          <select
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
        </div>

      </div>

      {loading ? (

        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : getFilteredMeasurements().length === 0 ? (
        <div className="alert alert-info text-center">
          No data to show. Please add some measurements first.
        </div>
      ) : (
        <div className="row g-4">
          {Object.entries(groupedFields).map(([group, fields]) => (
            <div key={group}>
              <h3 className="mt-4 mb-3">{group}</h3>
              <div className="row g-4">
                {fields.map((field) => (
                  <div key={field} className="col-12 col-md-6">
                    <div className="card p-3 shadow-sm" style={{ minWidth: '300px' }}>
                      <h5 className="mb-3">{formatFieldName(field)} Progress</h5>
                      <Line data={prepareChartData(field)} options={chartOptions} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Analytics;
