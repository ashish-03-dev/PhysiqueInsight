import React, { useState, useEffect } from 'react';
import AddMeasurementForm from '../components/Measurements/AddMeasurementForm';
import MeasurementTable from '../components/Measurements/MeasurementTable';
import CompareMeasurementsPage from '../components/Measurements/CompareMeasurementsPage';
import API from '../utils/api';

const Measurement = () => {

  const [showForm, setShowForm] = useState(false);
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMeasurements = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/measurements');
      setMeasurements(res.data);
    } catch (err) {
      console.error('Error fetching measurements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeasurements();
  }, []);

  return <>
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h3>My Measurements</h3>

        <button className="btn btn-success" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Close' : 'Add New Measurement'}
        </button>
      </div>

      {showForm && <AddMeasurementForm setShowForm={setShowForm} fetchMeasurements={fetchMeasurements} />}

      <hr />

      <MeasurementTable measurements={measurements} loading={loading} />
      <hr />
      <CompareMeasurementsPage measurements={measurements} loading={loading} />

    </div>
  </>
};

export default Measurement;
