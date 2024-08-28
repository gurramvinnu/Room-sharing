import React, { useState } from 'react';
import './loginpage.css';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        const userData = {
            phone,
            password,
        };

        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok && result.status) {
                console.log('Login successful:', result);
                localStorage.setItem("room_id",result?.user.room_id )
                localStorage.setItem("Loginname",result?.user.first_name )
                localStorage.setItem("phone",result?.user.phone);
                localStorage.setItem("login_id",result?.user._id)
                window.location.href = '/';
            } else {
                setErrorMessage(result.msg || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
           
            <form className="login-form" onSubmit={handleSubmit}>
            <div className="logo">
            <img src={process.env.PUBLIC_URL + '/logo.jpeg'} alt="Logo" />
            </div>
                <div className="input-container">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="input-field"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); setErrorMessage(''); }}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setErrorMessage(''); }}
                        />
                        <span 
                            className="password-toggle-icon" 
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                </div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <button type="submit" className="login-button">
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="new-user">
                <a href="/SignupPage">New User? Sign Up</a>
            </div>
            </form>
           
        </div>
    );
};

export default LoginPage;
