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
            const response = await fetch('http://localhost:666/api/signin', {
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
            <div className="logo">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Finclusive-group-people-ai-generated_61009544.htm&psig=AOvVaw3kuOvR0WKtLvp0xzidtpHJ&ust=1720872456727000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDJ1s67oYcDFQAAAAAdAAAAABAEhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-ai-image%2Finclusive-group-people-ai-generated_61009544.htm&psig=AOvVaw3kuOvR0WKtLvp0xzidtpHJ&ust=1720872456727000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDJ1s67oYcDFQAAAAAdAAAAABAE" alt="Logo" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                
                <div className="input-container">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
            </form>
            <div className="new-user">
                <a href="/SignupPage">New User? Sign Up</a>
            </div>
        </div>
    );
};

export default LoginPage;
