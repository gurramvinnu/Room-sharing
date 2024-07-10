import React, { useState } from 'react';
import './loginpage.css';


const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <div className="logo">
                <img src="https://www.example.com/logo.png" alt="Logo" />
            </div>
            <form className="login-form">
                <div className="input-container">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="input-field"
                        />
                        <span 
                            className="password-toggle-icon" 
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                </div>
                <button type="submit" className="login-button" href="/*">Login</button>
            </form>
            <div className="new-user">
                <a href="/SignupPage">New User? Sign Up</a>
            </div>
        </div>
    );
};

export default LoginPage;
