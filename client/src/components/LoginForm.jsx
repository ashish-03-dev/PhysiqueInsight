import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
const LoginForm = ({ onSwitchForm }) => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post('/auth/login',
                { email, password },
                { headers: { Authorization: '', }, }
            );

            if (res.status === 200) {
                const data = await res.data;
                localStorage.setItem('token', data.token);
                navigate('/home/dashboard');
            } else {
                setError("Invalid Username or Password");
            }
        } catch (err) {
            console.log(err);
            setError('Something went wrong: ' + err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <div className='w-100'>
                <h2 className='ps-4'>Log in</h2>
                <form className='py-3' onSubmit={handleLogin}>
                    <div className="input-group mb-3 form-control rounded-pill">
                        <span className='d-flex align-items-center'>
                            <i className="fa-solid fa-user px-1"></i>
                        </span>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control border-0 shadow-none" placeholder='Enter your email' id="exampleInputEmail1" />
                    </div>
                    <div className="input-group mb-3 form-control rounded-pill">
                        <span className='d-flex align-items-center'>
                            <i className="fa-solid fa-lock px-1"></i>
                        </span>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control border-0 shadow-none" placeholder='Password' id="exampleInputPassword1" />
                    </div>
                    <div className='p-1 d-flex justify-content-between align-items-center'>
                        <button type="submit" disabled={loading} className="btn btn-primary rounded-pill px-4">{loading ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
                {error && <p>{error}</p>}
                <p>
                    Don't have an account?{" "}
                    <button onClick={onSwitchForm} className="btn btn-link p-0">
                        <strong>Sign up</strong>
                    </button>
                </p>
            </div>
        </>
    )
}

export default LoginForm
