import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

const ProfileInfoPage = () => {
  const { triggerToast } = useLayoutContext();

  const [user, setUser] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const [saving, setSaving] = useState(false);
  const fetchUserProfile = async () => {

    try {
      const res = await API.get('/profile');
      setUser(res.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      triggerToast('error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const previousUser = { ...user };

    try {
      setSaving(true);
      const { name, age, gender, height, weight, goal } = user;
      const updatedData = { name, age, gender, height, weight, goal };

      const res = await API.put('/profile', updatedData);
      setUser(res.data);
      triggerToast('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      setUser(previousUser);
      console.error('Update failed:', err);
      triggerToast('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);


  const fields = [
    { name: 'name', label: 'Name', type: 'text', col: 'col-md-6', required: true },
    { name: 'email', label: 'Email', type: 'email', col: 'col-md-6', disabled: true },
    { name: 'age', label: 'Age', type: 'number', col: 'col-md-4' },
    { name: 'gender', label: 'Gender', type: 'select', col: 'col-md-4', options: ['', 'Male', 'Female'] },
    { name: 'height', label: 'Height (cm)', type: 'number', col: 'col-md-4' },
    { name: 'weight', label: 'Weight (kg)', type: 'number', col: 'col-md-6' },
    { name: 'goal', label: 'Goal', type: 'text', col: 'col-md-6', placeholder: 'e.g., Gain muscle' }
  ];


  if (loading) {
    return (
      <div className="container py-4">
        <div className="card p-4 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  

  return (
    <div className="container py-4">
      <h3>Profile Information</h3>
      <div className="card p-4 mb-4">
        {editMode ? (
          <form onSubmit={handleSave} className="row g-3">
            {fields.map(({ name, label, type, col, required, placeholder, options, disabled }) => (
              <div key={name} className={col}>
                <label className="form-label">{label}</label>
                {type === 'select' ? (
                  <select
                    name={name}
                    value={user[name]}
                    onChange={handleChange}
                    className="form-select"
                    required={required}
                  >
                    <option value="">Select</option>
                    {options.slice(1).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type || 'text'}
                    name={name}
                    value={user[name]}
                    onChange={handleChange}
                    className="form-control"
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled}
                  />
                )}
              </div>
            ))}

            <div className="col-12">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
                disabled={saving}
              >
                ❌ Cancel
              </button>
            </div>

          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Height:</strong> {user.height} cm</p>
            <p><strong>Weight:</strong> {user.weight} kg</p>
            <p><strong>Goal:</strong> {user.goal}</p>
            <button className="btn btn-primary mt-2" onClick={() => setEditMode(true)}>✏️ Edit</button>
          </>
        )}
      </div>

    </div>
  );
};

export default ProfileInfoPage;
