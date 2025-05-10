import React, { useState } from 'react';
import API from '../utils/api';
import { useOutletContext } from 'react-router-dom';

const useLayoutContext = () => useOutletContext();

const SettingsPage = () => {

  const { triggerToast } = useLayoutContext();

  const [email, setEmail] = useState('');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleEmailChange = async () => {
    try {
      await API.put('/settings/email', { email },);
      triggerToast('Email updated successfully');
      setShowEmailForm(false);
      setEmail('');
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || 'Failed to update email';
      triggerToast(errorMessage);
    }
  };

  const handlePasswordChange = async () => {
    try {
      await API.put('/settings/password', passwords);
      triggerToast('Password updated successfully');
      setShowPasswordForm(false);
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || 'Failed to update password';
      triggerToast(errorMessage);
    }
  };
  

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;
    try {
      await API.delete('/settings/delete');
      localStorage.clear();
      triggerToast('Account deleted.');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);

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
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="New password"
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
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
