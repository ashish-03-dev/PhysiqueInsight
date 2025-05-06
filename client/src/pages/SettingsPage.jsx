import React, { useState } from 'react';
import API from '../utils/api';

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '' });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const token = localStorage.getItem('token');

  const handleEmailChange = async () => {
    try {
      await API.put(
        '/settings/email',
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Email updated successfully');
      setShowEmailForm(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update email');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await API.put(
        '/settings/password',
        passwords,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password updated successfully');
      setShowPasswordForm(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await API.delete('/settings/delete', {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      alert('Account deleted.');
      window.location.href = '/signup';
    } catch (err) {
      console.error(err);
      alert('Failed to delete account');
    }
  };

  return (
    <div className="container py-4">
      <h3>Settings ⚙️</h3>

      <div className="card p-4 mb-4">
        <h5>Account Settings</h5>

        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => setShowEmailForm(!showEmailForm)}
        >
          {showEmailForm ? 'Cancel Email Update' : 'Change Email'}
        </button>

        {showEmailForm && (
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="New email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmailChange} className="btn btn-success mt-2">
              Update Email
            </button>
          </div>
        )}

        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? 'Cancel Password Update' : 'Change Password'}
        </button>

        {showPasswordForm && (
          <div className="mb-3">
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Current password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
            <input
              type="password"
              className="form-control"
              placeholder="New password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
            <button onClick={handlePasswordChange} className="btn btn-success mt-2">
              Update Password
            </button>
          </div>
        )}
      </div>

      <div className="card p-4 text-danger">
        <h5>Danger Zone</h5>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
