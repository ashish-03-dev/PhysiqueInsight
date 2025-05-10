import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../utils/api';
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

export default function AddMeasurementForm({ setShowForm, fetchMeasurements }) {
  const { triggerToast } = useLayoutContext();

  const [formData, setFormData] = useState({
    height: "",
    shoulderWidth: "",
    chestWidth: "",
    chestCircumference: "",
    waistCircumference: "",
    hipWidth: "",
    bicepCircumferenceLeft: "",
    bicepCircumferenceRight: "",
    forearmCircumferenceLeft: "",
    forearmCircumferenceRight: "",
    thighCircumferenceLeft: "",
    thighCircumferenceRight: "",
    calfCircumferenceLeft: "",
    calfCircumferenceRight: "",
    torsoLength: "",
    legLength: "",
    armSpan: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || ""
    });
  };


  const autoFillForm = () => {
    setFormData({
      height: 175,
      shoulderWidth: 48,              // increased
      chestWidth: 42,
      chestCircumference: 96,
      waistCircumference: 80,         // reduced slightly
      hipWidth: 39,
      bicepCircumferenceLeft: 32,
      bicepCircumferenceRight: 33,
      forearmCircumferenceLeft: 28,
      forearmCircumferenceRight: 28,
      thighCircumferenceLeft: 56,
      thighCircumferenceRight: 55,
      calfCircumferenceLeft: 37,
      calfCircumferenceRight: 36,
      torsoLength: 68,
      legLength: 87,
      armSpan: 176
    });
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/measurements', { measurements: formData });;
      console.log(res.data);
      triggerToast('Measurement Saved!');

      setShowForm(false);
      setFormData({
        height: "",
        shoulderWidth: "",
        chestWidth: "",
        chestCircumference: "",
        waistCircumference: "",
        hipWidth: "",
        bicepCircumferenceLeft: "",
        bicepCircumferenceRight: "",
        forearmCircumferenceLeft: "",
        forearmCircumferenceRight: "",
        thighCircumferenceLeft: "",
        thighCircumferenceRight: "",
        calfCircumferenceLeft: "",
        calfCircumferenceRight: "",
        torsoLength: "",
        legLength: "",
        armSpan: ""
      });
      fetchMeasurements();
      triggerToast('Measurement Saved!');
    } catch (error) {
      console.error(error);
      triggerToast('Failed to save plan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4 position-relative">
      <button
        type="button"
        className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-3"
        onClick={autoFillForm}
      >
        Auto-Fill Form
      </button>

      <div className="row mt-4">
        {Object.keys(formData).map((field) => (
          <div className="col-md-6 mb-3" key={field}>
            <label>
              {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} (cm)
            </label>
            <input
              type="number"
              className="form-control"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save Measurement"}
      </button>
    </form>
  );
}
