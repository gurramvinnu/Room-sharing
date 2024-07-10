import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSuggestions, setPasswordSuggestions] = useState('');

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordSuggestions(value.length >= 8 ? '' : 'Password must be at least 8 characters');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form className="signup-form">
                <div className="input-container">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" name="phone" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="roomId">Room ID</label>
                    <input type="text" id="roomId" name="roomId" className="input-field" />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Create Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="input-field"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordSuggestions && <p className="password-suggestions">{passwordSuggestions}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="input-field"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
