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

  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: parseFloat(e.target.value) || ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post('/measurements', { measurements: formData});;
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
      window.location.reload();
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
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
      <div className="row">
        {Object.keys(formData).map((field) => (
          <div className="col-md-6 mb-3" key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} (cm)</label>
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
