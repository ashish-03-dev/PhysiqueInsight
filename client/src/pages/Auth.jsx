import React, { useState, useEffect } from 'react'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [serverReady, setServerReady] = useState(false);
    const url = "http://192.168.0.102:4000";

    useEffect(() => {
        const checkServer = async () => {
            try {
                await fetch(`${url}/api/ping`); // Your backend health check route
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
        <div className='container-fluid vh-100'>
            <div className='row h-100'>
                <div className='col-md-6 d-flex flex-column justify-content-center align-items-center bg-light text-center'>
                    <h1 className='text-dark py-3'>Be Fit</h1>
                    <p className='rounded-pill form-control'>Choose to be Asthetic</p>
                </div>
                <div className='col-md-6 d-flex flex-column justify-content-center align-items-center bg-white'>
                    <div className='p-4 rounded h-50'>
                        {isLogin ? <LoginForm onSwitchForm={handleFormSwitch} /> : <SignupForm onSwitchForm={handleFormSwitch} />}
                        <p className='text-muted mt-3 text-center' style={{ fontSize: '0.9rem' }}>
                            {serverReady ? 'Server is ready!' : 'Please wait up to 30 seconds as the server may be cold starting.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
