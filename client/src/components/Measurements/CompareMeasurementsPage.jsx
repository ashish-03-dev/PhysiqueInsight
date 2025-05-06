import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CompareMeasurementsPage({ measurements, loading }) {
  const [selectedFirst, setSelectedFirst] = useState(null);
  const [selectedSecond, setSelectedSecond] = useState(null);

  const chartData = {
    labels: ['Height', 'Weight', 'Chest', 'Waist', 'Hips', 'Arms', 'Thighs'],
    datasets: [
      {
        label: 'First Measurement',
        data: selectedFirst
          ? [
              selectedFirst.measurements.height,
              selectedFirst.measurements.weight,
              selectedFirst.measurements.chestWidth || 0,
              selectedFirst.measurements.waistCircumference || 0,
              selectedFirst.measurements.hipWidth || 0,
              ((selectedFirst.measurements.bicepCircumferenceLeft || 0) + (selectedFirst.measurements.bicepCircumferenceRight || 0)) / 2,
              ((selectedFirst.measurements.thighCircumferenceLeft || 0) + (selectedFirst.measurements.thighCircumferenceRight || 0)) / 2
            ]
          : [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
      },
      {
        label: 'Second Measurement',
        data: selectedSecond
          ? [
              selectedSecond.measurements.height,
              selectedSecond.measurements.weight,
              selectedSecond.measurements.chestWidth || 0,
              selectedSecond.measurements.waistCircumference || 0,
              selectedSecond.measurements.hipWidth || 0,
              ((selectedSecond.measurements.bicepCircumferenceLeft || 0) + (selectedSecond.measurements.bicepCircumferenceRight || 0)) / 2,
              ((selectedSecond.measurements.thighCircumferenceLeft || 0) + (selectedSecond.measurements.thighCircumferenceRight || 0)) / 2
            ]
          : [],
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
      }
    ]
  };

  if (loading) return <p className="text-center mt-4">Loading measurements...</p>;

  return (
    <div className="container py-4">
      <h3>Compare Measurements</h3>
      <div className="row mb-4">
        <div className="col-md-6">
          <label>Select First Measurement</label>
          <select
            className="form-select"
            onChange={(e) => {
              const selected = measurements.find(m => m._id === e.target.value);
              setSelectedFirst(selected || null);
            }}
          >
            <option value="">Select...</option>
            {measurements.map((m) => (
              <option key={m._id} value={m._id}>
                {new Date(m.createdAt).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label>Select Second Measurement</label>
          <select
            className="form-select"
            onChange={(e) => {
              const selected = measurements.find(m => m._id === e.target.value);
              setSelectedSecond(selected || null);
            }}
          >
            <option value="">Select...</option>
            {measurements.map((m) => (
              <option key={m._id} value={m._id}>
                {new Date(m.createdAt).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedFirst && selectedSecond && (
        <div className="card shadow-sm p-4">
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}
