import React, { useState } from 'react'
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSwitchForm }) => {

  const navigate = useNavigate();

  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(
        '/auth/signup',
        { name, password, email });

      const data = res.data;

      if (res.status === 201) {
        localStorage.setItem('token', data.token);
        navigate('/home/dashboard');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong');
    }
    setLoading(false);
  };


  return (
    <div className='w-100'>
      <h2 className='ps-4'>Sign in</h2>
      <form className='py-3' onSubmit={handleSignup}>
        <div className="input-group mb-3 form-control rounded-pill">
          <span className='d-flex align-items-center'>
            <i className="fa-solid fa-user px-1"></i>
          </span>
          <input type="text" value={name} onChange={(e) => setUsername(e.target.value)} className="form-control border-0 shadow-none" placeholder='Name' id="exampleInputUsername1" />
        </div>
        <div className="input-group mb-3 form-control rounded-pill">
          <span className='d-flex align-items-center'>
            <i className="fa-solid fa-envelope px-1"></i>
          </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-0 shadow-none" placeholder='Enter your email' id="exampleInputEmail1" />
        </div>
        <div className="input-group mb-3 form-control rounded-pill">
          <span className='d-flex align-items-center'>
            <i className="fa-solid fa-lock px-1"></i>
          </span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control border-0 shadow-none" placeholder='Password' id="exampleInputPassword1" />
        </div>
        <div className='p-1 d-flex justify-content-between align-items-center'>
          <button type="submit" disabled={loading} className="btn btn-primary rounded-pill px-4">{loading ? "Signing in..." : "Signup"}</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      <p>
        Already have an account?{" "}
        <button
          onClick={onSwitchForm}
          className="btn btn-link p-0 fw-semibold"
        >
          Log in
        </button>

      </p>
    </div>
  )
}

export default SignupForm
