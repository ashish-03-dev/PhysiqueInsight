import React, { useState } from 'react';
import API from '../utils/api';
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

const SettingsPage = () => {

  const { triggerToast } = useLayoutContext();

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
      triggerToast('Email updated successfully');
      setShowEmailForm(false);
      setEmail('');
    } catch (err) {
      console.error(err);
      triggerToast('Failed to update email');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await API.put('/settings/password', passwords);
      triggerToast('Password updated successfully');
      setShowPasswordForm(false);
      setPasswords({ current: '', new: '' });
    } catch (err) {
      console.error(err);
      triggerToast('Failed to update password');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await API.delete('/settings/delete');
      localStorage.clear();
      triggerToast('Account deleted.');
      window.location.href = '/signup';
    } catch (err) {
      console.error(err);
      triggerToast('Failed to delete account');
    }
  };

  return (
    <div className="container py-4">
      <h3>Settings ⚙️</h3>

      <div className="card p-4 mb-4">
        <h5 className='mb-4'>Account Settings</h5>

        {!showEmailForm && (
          <button
            className="btn btn-outline-primary mb-2"
            onClick={() => setShowEmailForm(true)}
          >
            Change Email
          </button>
        )}

        {showEmailForm && (
          <div className="mb-3">
            <input
              type="email"
              className="form-control mb-2"
              placeholder="New email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button onClick={handleEmailChange} className="btn btn-success">
                Update Email
              </button>
              <button onClick={() => setShowEmailForm(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {!showPasswordForm && (
          <button
            className="btn btn-outline-primary mb-2"
            onClick={() => setShowPasswordForm(true)}
          >
            Change Password
          </button>
        )}

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
              className="form-control mb-2"
              placeholder="New password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
            />
            <div className="d-flex gap-2">
              <button onClick={handlePasswordChange} className="btn btn-success">
                Update Password
              </button>
              <button onClick={() => setShowPasswordForm(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card p-4 text-danger">
        <h5 className='mb-3'>Danger Zone</h5>
        <button className="btn btn-danger" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
