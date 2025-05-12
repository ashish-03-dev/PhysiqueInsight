import React, { useState, useEffect } from 'react'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm";
import API from '../utils/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverReady, setServerReady] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        await API.get('/ping'); // Your backend health check route
        setServerReady(true);
      } catch (error) {
        console.error('Server is not ready yet');
      }
    };

    checkServer();
  }, []);

  const handleFormSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div
      className="container-fluid"
      style={{ height: '100svh' }} // fallback + safe viewport unit
    >

      <div className="row h-100">
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center bg-light text-center p-3">
          <img
            src="/assets/hero.png" // replace with your actual image path
            alt="Fitness Hero"
            className="img-fluid mb-4"
            style={{ maxHeight: '60vh', objectFit: 'cover', borderRadius: '1rem' }}
          />
          <h1 className="text-dark py-2">Be Fit</h1>
          <p className="rounded-pill form-control border-0 bg-white text-dark fw-medium">
            Choose to be Aesthetic
          </p>
        </div>


        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-5">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            {isLogin ? (
              <LoginForm onSwitchForm={handleFormSwitch} />
            ) : (
              <SignupForm onSwitchForm={handleFormSwitch} />
            )}

            <p className="umt-4 text-center" style={{ fontSize: '0.9rem' }}>
              {serverReady
                ? '✅ Server is ready!'
                : '⏳ Please wait, server is starting... (this can take up to 20 seconds)'}
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;
