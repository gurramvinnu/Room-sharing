import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header1.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const profileMenuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const toggleProfileMenu = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClickOutside = (event) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
            setProfileMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="header">
            <div className="menu-icon" onClick={toggleMenu}>&#9776;</div>
            <h1>Room Sharing</h1>
            <div className="profile-icon" onClick={toggleProfileMenu}>
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                    <span>&#128100;</span>
                )}
            </div>
            {showMenu && (
                <div className="context-menu">
                    <ul>
                        <li><Link to="/" onClick={() => setShowMenu(false)}>Dashboard</Link></li>
                        <li><Link to="/add-items" onClick={() => setShowMenu(false)}>Add Items</Link></li>
                        <li><Link to="/add-members" onClick={() => setShowMenu(false)}>Add Members</Link></li>
                        <li><Link to="/settings" onClick={() => setShowMenu(false)}>Settings</Link></li>
                    </ul>
                </div>
            )}
            {profileMenuOpen && (
                <div className="profile-menu" ref={profileMenuRef}>
                    <div className="profile-upload">
                        <label htmlFor="profile-upload-input" className="upload-label">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="profile-image" />
                            ) : (
                                <span>Upload Image</span>
                            )}
                        </label>
                        <input
                            id="profile-upload-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <button className="edit-profile">Edit Profile</button>
                    <button className="logout">Log Out</button>
                </div>
            )}
        </div>
    );
};

export default Header;
