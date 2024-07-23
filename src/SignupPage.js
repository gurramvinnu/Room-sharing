import React, { useState } from 'react';
import './SignupPage.css';

const SignupPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSuggestions, setPasswordSuggestions] = useState('');

    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    // const [emailError, setEmailError] = useState('');
    const [roomIdError, setRoomIdError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    // const [generalErrorMessage, setGeneralErrorMessage] = useState('');
    // const [successMessage, setSuccessMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordSuggestions(value.length >= 8 ? '' : 'Password must be at least 8 characters');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const validateFields = () => {
        let valid = true;
        setFirstNameError('');
        setLastNameError('');
        setPhoneError('');
        // setEmailError('');
        setRoomIdError('');
        setPasswordError('');
        setConfirmPasswordError('');

        if (!firstName) {
            setFirstNameError('First name is required');
            valid = false;
        }
        if (!lastName) {
            setLastNameError('Last name is required');
            valid = false;
        }
        if (!phone) {
            setPhoneError('Phone number is required');
            valid = false;
        }
       
        if (!roomId) {
            setRoomIdError('Room ID is required');
            valid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        }
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            valid = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            valid = false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }
        return valid;
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // setGeneralErrorMessage('');
        // setSuccessMessage('');

        if (!validateFields()) {
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            room_id: roomId,
            password: password,
        };

        try {
            const response = await fetch('https://back-end-room-sharing.onrender.com/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response) {
                console.log('Login successful:');
                
                window.location.href = '/login';
            } else {
               
            }
            
        } catch (error) {
            console.error('Error:', error);
            // setGeneralErrorMessage('An error occurred. Please try again.');
        }

    };
    const back=()=>{
        window.location.href = '/login'
    }

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2 align="center">Sign Up</h2>
                <div className="input-container">
                    <label htmlFor="firstName">First Name <span className={!firstName?"required":"filled"}>*</span></label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="input-field"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {firstNameError && <p className="error-message">{ !firstName? firstNameError:""}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="lastName">Last Name <span className={!lastName?"required":"filled"}>*</span></label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="input-field"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {lastNameError && <p className="error-message">{lastName?"":lastNameError}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="phone">Phone <span className={!phone?"required":"filled"}>*</span></label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="input-field"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {phoneError && <p className="error-message">{phone?"":phoneError}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="email">Email </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                   
                </div>
                <div className="input-container">
                    <label htmlFor="roomId">Room ID <span className={!roomId?"required":"filled"}>*</span></label>
                    <input
                        type="text"
                        id="roomId"
                        name="roomId"
                        className="input-field"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                    {roomIdError && <p className="error-message">{roomId?"":roomIdError}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="password">Create Password <span className={!password?"required":"filled"}>*</span></label>
                    <div className="password-field">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="input-field"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <span 
                            className="password-toggle-icon" 
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                    {passwordError && <p className="error-message">{!password ? passwordError :''}</p>}
                    {passwordSuggestions && <p className="error-message">{passwordSuggestions}</p>}
                </div>
                <div className="input-container">
                    <label htmlFor="confirmPassword">Confirm Password <span className={!confirmPassword?"required":"filled"}>*</span></label>
                    <div className="password-field">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            className="input-field"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <span 
                            className="password-toggle-icon" 
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                    {confirmPasswordError && <p className="error-message">{confirmPassword?"":confirmPasswordError}</p>}
                </div>
                <button type="submit" className="signup-button">Sign Up</button>
                <div  className="backup-button" onClick={back}>Back to login</div>
            </form>
            
        </div>
    );
};

export default SignupPage;
