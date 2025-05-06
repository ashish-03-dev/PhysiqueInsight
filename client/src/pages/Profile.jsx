import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const ProfileInfoPage = () => {
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

  const fetchUserProfile = async () => {
    try {
      const res = await API.get('/profile');
      setUser(res.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await API.put('/profile', user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      // alert('Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
      alert('Error updating profile');
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


  return (
    <div className="container py-4">
      <h3>Profile Information</h3>
      <div className="card p-4 mb-4">
        {editMode ? (
          <form onSubmit={handleSave} className="row g-3">
            {fields.map(({ name, label, type, col, required, placeholder, options, disabled}) => (
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
              <button type="submit" className="btn btn-primary me-2">Save Changes</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>❌ Cancel</button>
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
